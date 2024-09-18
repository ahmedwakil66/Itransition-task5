import { User } from "./";

// A seed-based PRNG for consistent random number generation
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Function to introduce random errors
export function introduceErrors(
  text: string,
  errorCount: number,
  seed: number
) {
  const errorTypes = ["delete", "add", "swap"];
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const errorText = text.split(""); // Convert to array for easy manipulation

  for (let i = 0; i < errorCount; i++) {
    const randomErrorType =
      errorTypes[Math.floor(seededRandom(seed + i) * errorTypes.length)];
    const randomPos = Math.floor(seededRandom(seed + i + 1) * errorText.length);

    if (errorText[randomPos] === " ") {
      continue; // Skip spaces when working spaces
    }

    switch (randomErrorType) {
      case "delete":
        if (errorText.length > 0) {
          errorText.splice(randomPos, 1); // Delete character at random position
        }
        break;
      case "add":
        const randomChar = alphabet.charAt(
          Math.floor(seededRandom(seed + i + 2) * alphabet.length)
        );
        errorText.splice(randomPos, 0, randomChar); // Add random character at random position
        break;
      case "swap":
        if (randomPos < errorText.length - 1) {
          // Swap the character at randomPos with the one next to it
          const temp = errorText[randomPos];
          errorText[randomPos] = errorText[randomPos + 1];
          errorText[randomPos + 1] = temp;
        }
        break;
    }
  }

  return errorText.join(""); // Convert back to string
}

function introducePhoneNumberErrors(
  phone: string,
  errorCount: number,
  seed: number
) {
  const errorTypes = ["add-delete", "swap"]; // Only allow 'add' and 'swap' for phone numbers
  const digits = "0123456789";
  const charsAndHyphens =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";

  const phoneText = phone.split(""); // Convert to array for easy manipulation

  for (let i = 0; i < errorCount; i++) {
    const randomErrorType =
      errorTypes[Math.floor(seededRandom(seed + i) * errorTypes.length)];
    const randomPos = Math.floor(seededRandom(seed + i + 1) * phoneText.length);

    switch (randomErrorType) {
      case "add-delete":
        // Add a random character, then delete a random character to maintain the same length
        const isDigit = seededRandom(seed + i + 2) < 0.8; // 80% chance to add a digit
        const randomChar = isDigit
          ? digits.charAt(
              Math.floor(seededRandom(seed + i + 3) * digits.length)
            )
          : charsAndHyphens.charAt(
              Math.floor(seededRandom(seed + i + 4) * charsAndHyphens.length)
            );

        // Add random character at random position
        phoneText.splice(randomPos, 0, randomChar);

        // Delete another character at a different random position (avoid the one just added)
        const randomPosToDelete = Math.floor(
          seededRandom(seed + i + 5) * phoneText.length
        );
        if (randomPosToDelete !== randomPos) {
          phoneText.splice(randomPosToDelete, 1);
        } else if (randomPosToDelete > 0) {
          phoneText.splice(randomPosToDelete - 1, 1);
        } else if (randomPosToDelete < phoneText.length - 1) {
          phoneText.splice(randomPosToDelete + 1, 1);
        }
        break;
      case "swap":
        if (randomPos < phoneText.length - 1) {
          // Swap the character at randomPos with the one next to it
          const temp = phoneText[randomPos];
          phoneText[randomPos] = phoneText[randomPos + 1];
          phoneText[randomPos + 1] = temp;
        }
        break;
    }
  }

  return phoneText.join(""); // Convert back to string
}

export function generateUserWithErrors(
  //   fakerSeed: number,
  user: User,
  errorRate: number,
  errorSeed: number
) {
  // Calculate number of errors for the current record
  const errorCount = Math.floor(errorRate); // At least this many errors
  const additionalErrorChance = errorRate - errorCount; // Chance to add one more error

  let adjustedErrorCount = errorCount;
  if (seededRandom(errorSeed) < additionalErrorChance) {
    adjustedErrorCount++; // Add one more error based on the probability
  }

  // Introduce errors to each field based on adjustedErrorCount
  user.fullName = introduceErrors(user.fullName, adjustedErrorCount, errorSeed);
  user.address[0] = introduceErrors(
    user.address[0],
    adjustedErrorCount,
    errorSeed + 1
  );
  user.address[1] = introduceErrors(
    user.address[1],
    adjustedErrorCount,
    errorSeed + 1
  );
  user.phone.national = introducePhoneNumberErrors(
    user.phone.national,
    adjustedErrorCount,
    errorSeed + 2
  );
  user.phone.international = introducePhoneNumberErrors(
    user.phone.international,
    adjustedErrorCount,
    errorSeed + 2
  );

  return user;
}
