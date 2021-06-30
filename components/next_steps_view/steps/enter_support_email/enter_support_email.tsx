// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';

import Input from 'components/input';

import './enter_support_email.scss';
import {StepComponentProps} from 'components/next_steps_view/steps';
import {AdminConfig} from 'mattermost-redux/types/config';
import {ActionFunc} from 'mattermost-redux/types/actions';

type Props = StepComponentProps & {
    supportEmail: string;
    actions: {
        patchConfig: (config: AdminConfig) => ActionFunc;
    };
};

function EnterSupportEmail(props: Props): JSX.Element {
    const [supportEmail, setSupportEmail] = useState('');
    const updateState = (setStateFunc: (value: string) => void) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setStateFunc(event.target.value);
        };
    };

    useEffect(() => {
        setSupportEmail(props.supportEmail);
    }, [props.supportEmail]);

    const finishStep = async () => {
        if (supportEmail !== '') {
            const config = JSON.parse(JSON.stringify({
                SupportSettings: {
                    SupportEmail: supportEmail,
                },
            }));

            await props.actions.patchConfig(config);
        }
        props.onFinish(props.id);
    };

    return (
        <div className='NextStepsView__stepWrapper'>
            <div className='EnterSupportEmailStep'>
                <div className='EnterSupportEmailStep__header'>
                    <h3>
                        <FormattedMessage
                            id='next_steps_view.enter_support_email_step.stayConnected'
                            defaultMessage='Stay connected'
                        />
                    </h3>
                    <FormattedMessage
                        id='next_steps_view.enter_support_email_step.enterTheEmail'
                        defaultMessage='Enter a support email that we can use to contact you in the future.'
                    />
                </div>
                <div className='EnterSupportEmailStep__body'>
                    <Input
                        placeholder='Email'
                        className='support_input'
                        value={supportEmail}
                        onChange={updateState(setSupportEmail)}
                    />
                </div>
            </div>
            <div className='NextStepsView__wizardButtons'>
                <button
                    data-testid='InviteMembersStep__finishButton'
                    className={'NextStepsView__button NextStepsView__finishButton primary'}
                    onClick={finishStep}
                >
                    <FormattedMessage
                        id='next_steps_view.invite_members_step.finish'
                        defaultMessage='Finish'
                    />
                </button>
            </div>
        </div>
    );
}
export default EnterSupportEmail;
