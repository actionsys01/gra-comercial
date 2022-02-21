import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { Plus, Filter } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import Loader from '@components/Loader';
import { BtnRow } from '@styles/buttons';

export default function index() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  return <></>;
}
