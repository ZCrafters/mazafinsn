-- Create chat conversations table
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_conversations
CREATE POLICY "Users can view their own conversations" 
  ON public.chat_conversations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations" 
  ON public.chat_conversations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON public.chat_conversations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations" 
  ON public.chat_conversations FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for chat_messages
CREATE POLICY "Users can view messages from their conversations" 
  ON public.chat_messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their conversations" 
  ON public.chat_messages FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
