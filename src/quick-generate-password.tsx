import {
  Clipboard,
  PopToRootType,
  Toast,
  getPreferenceValues,
  showHUD,
  showToast,
} from "@raycast/api";

import { generatePassword } from "@/helpers/helpers";

interface Preferences {
  length: string;
  useNumbers: boolean;
  useChars: boolean;
}

const handleGeneratePassword = () => {
  const { length, useNumbers, useChars } = getPreferenceValues<Preferences>();

  const lengthNumber = parseInt(length, 10);

  if (!Number.isFinite(lengthNumber)) {
    showToast(Toast.Style.Failure, "Password length must be a number");
    return;
  }

  if (lengthNumber < 5) {
    showToast(Toast.Style.Failure, "Password length must be greater than 4");
    return;
  }

  if (lengthNumber > 64) {
    showToast(Toast.Style.Failure, "Password length must be less than 65");
    return;
  }

  const generatedPassword = generatePassword(lengthNumber, useNumbers, useChars);

  Clipboard.copy(generatedPassword);
  showHUD(`Copied Password - ${generatedPassword} 🎉`, { clearRootSearch: false, popToRootType: PopToRootType.Default });
};

export default function Command() {
  handleGeneratePassword();
}
