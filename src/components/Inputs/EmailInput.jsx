import React from 'react';
import Button from '../Buttons/Button';
import {
  StIcon,
  StInput,
  StInputBox,
  StInputDiv,
  StInputFrame,
  StMessage,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';
import checkIcon from '../../assets/Icons/checkIcon.svg';
import CircularProgress from '@mui/material/CircularProgress';

function EmailInput({
  label,
  inputboxwidth,
  divwith,
  bordercolor,
  border,
  checkCodeBorder,
  emailBorder,
  onFocus,
  onBlur,
  onClick,
  disabled,
  button,
  message,
  value,
  validEmail,
  validEmailCode,
  isEmailCodeVerified,
  isEmailVerified,
  isEmailLoading,
  successMessage,
  errorMessage,
  ...inputprops
}) {
  const isButtonDisabled = isEmailVerified || isEmailCodeVerified;
  const isInputDisabled = isEmailVerified || isEmailCodeVerified;

  const emailBorderColor = border(
    value,
    validEmail || validEmailCode,
    emailBorder || checkCodeBorder
  );

  return (
    <StInputBox inputboxwidth={inputboxwidth}>
      <label>{label}</label>
      <StInputFrame>
        <StInputDiv
          divwith={divwith}
          bordercolor={emailBorderColor}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <StInput type="text" value={value} {...inputprops} disabled={isInputDisabled} />
          <Button
            type="button"
            width="82px"
            height="36px"
            border="var(--color-gray)"
            borderradius="47px"
            onClick={onClick}
            disabled={isButtonDisabled}
          >
            {button}
          </Button>
        </StInputDiv>
        {value && (
          <StIcon>
            {(validEmail && isEmailVerified && (
              <img src={checkIcon} alt="Green Check Icon" />
            )) ||
              (isEmailLoading ? (
                <CircularProgress size={12} color="inherit" />
              ) : (
                validEmailCode && <img src={checkIcon} alt="Green Check Icon" />
              )) ||
              (!validEmail && !isEmailVerified && !isEmailLoading && (
                <img src={errorIcon} alt="Red Error Icon" />
              ))}
          </StIcon>
        )}
      </StInputFrame>
      {value && (
        <StMessage>
          {validEmailCode || validEmail || isEmailVerified
            ? successMessage
            : errorMessage}
        </StMessage>
      )}
    </StInputBox>
  );
}

export default EmailInput;
