/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import type { Actions } from '../types';
import { getSettings } from '../selectors';
import connectWithActions from '../connectWithActions';
import { OptionButton, OptionDivider, OptionRow, WebLink } from '../common';
import SwitchAccountButton from '../account-info/SwitchAccountButton';
import LogoutButton from '../account-info/LogoutButton';
import { IconDiagnostics, IconNotifications, IconNight, IconLanguage } from '../common/Icons';

const styles = StyleSheet.create({
  optionWrapper: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  accountButtons: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

type Props = {
  actions: Actions,
  theme: string,
};

class SettingsCard extends PureComponent<Props> {
  props: Props;

  handleThemeChange = () => {
    const { actions, theme } = this.props;
    actions.settingsChange('theme', theme === 'default' ? 'night' : 'default');
  };

  render() {
    const { theme, actions } = this.props;

    return (
      <ScrollView style={styles.optionWrapper}>
        <OptionRow
          Icon={IconNight}
          label="Night mode"
          defaultValue={theme === 'night'}
          onValueChange={this.handleThemeChange}
        />
        <OptionButton
          Icon={IconNotifications}
          label="Notifications"
          onPress={actions.navigateToNotifications}
        />
        <OptionButton Icon={IconLanguage} label="Language" onPress={actions.navigateToLanguage} />
        <OptionButton
          Icon={IconDiagnostics}
          label="Diagnostics"
          onPress={actions.navigateToDiagnostics}
        />
        <OptionDivider />
        <View style={styles.padding}>
          <WebLink label="Terms of service" href="/terms/" />
          <WebLink label="Privacy policy" href="/privacy/" />
        </View>
        <View style={styles.accountButtons}>
          <SwitchAccountButton />
          <LogoutButton />
        </View>
      </ScrollView>
    );
  }
}

export default connectWithActions(state => ({
  theme: getSettings(state).theme,
}))(SettingsCard);
