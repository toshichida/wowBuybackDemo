import { useState, useCallback } from 'react';
import type { ConsentFormInput, SelectedItem } from '../../shared/types';

const initialFormState: ConsentFormInput = {
  name: '',
  nameKana: '',
  gender: 'male',
  occupation: '',
  birthDate: '',
  phone: '',
  email: '',
  address: '',
  bankAccount: '',
  invoiceEligible: false,
  xAccountName: '',
  selectedItems: [],
};

export interface FormErrors {
  name?: string;
  nameKana?: string;
  gender?: string;
  occupation?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  address?: string;
  bankAccount?: string;
  invoiceEligible?: string;
  xAccountName?: string;
  idDocument?: string;
}

function validateForm(form: ConsentFormInput): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = '氏名を入力してください';
  if (!form.nameKana.trim()) errors.nameKana = '氏名（読み仮名）を入力してください';
  if (!form.occupation.trim()) errors.occupation = '職業を入力してください';
  if (!form.birthDate) errors.birthDate = '生年月日を入力してください';
  if (!form.phone.trim()) errors.phone = '電話番号を入力してください';
  if (!form.email.trim()) errors.email = 'メールアドレスを入力してください';
  if (!form.address.trim()) errors.address = '住所を入力してください';
  if (!form.bankAccount.trim()) errors.bankAccount = '銀行口座情報を入力してください';
  if (!form.xAccountName.trim()) errors.xAccountName = 'Xアカウント名を入力してください';

  return errors;
}

export function useConsentForm(initialItems: SelectedItem[]) {
  const [form, setForm] = useState<ConsentFormInput>({
    ...initialFormState,
    selectedItems: initialItems,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = useCallback(
    (field: keyof ConsentFormInput, value: ConsentFormInput[keyof ConsentFormInput]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    },
    []
  );

  const validate = useCallback(() => {
    const newErrors = validateForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const submit = useCallback(() => {
    if (!validate()) return;
    setIsSubmitted(true);
  }, [validate]);

  const closeModal = useCallback(() => setIsSubmitted(false), []);

  return { form, errors, isSubmitted, updateField, submit, closeModal };
}
