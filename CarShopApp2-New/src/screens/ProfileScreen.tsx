import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Title,
  Avatar,
  List,
  Divider,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logoutUser } from '../store/authSlice';
import { spacing, typography } from '../theme';

export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logoutUser()).unwrap();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            Profile
          </Title>
        </View>

        {/* User Info Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.userInfo}>
              <Avatar.Text
                size={80}
                label={getInitials(user?.username || 'U')}
                style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
              />
              <View style={styles.userDetails}>
                <Title style={styles.userName}>{user?.username}</Title>
                <Text style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}>
                  {user?.email}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* User Details */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.sectionTitle}>Account Information</Title>
            
            <List.Item
              title="Username"
              description={user?.username}
              left={(props) => <List.Icon {...props} icon="account" />}
              style={styles.listItem}
            />
            
            <Divider />
            
            <List.Item
              title="Email"
              description={user?.email}
              left={(props) => <List.Icon {...props} icon="email" />}
              style={styles.listItem}
            />
            
            {user?.phone && (
              <>
                <Divider />
                <List.Item
                  title="Phone"
                  description={user.phone}
                  left={(props) => <List.Icon {...props} icon="phone" />}
                  style={styles.listItem}
                />
              </>
            )}
            
            {user?.address && (
              <>
                <Divider />
                <List.Item
                  title="Address"
                  description={user.address}
                  left={(props) => <List.Icon {...props} icon="map-marker" />}
                  style={styles.listItem}
                />
              </>
            )}
          </Card.Content>
        </Card>

        {/* Actions */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.sectionTitle}>Actions</Title>
            
            <List.Item
              title="Edit Profile"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => {
                // TODO: Implement edit profile
                Alert.alert('Coming Soon', 'Edit profile feature will be available soon.');
              }}
            />
            
            <Divider />
            
            <List.Item
              title="Change Password"
              left={(props) => <List.Icon {...props} icon="lock-reset" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => {
                // TODO: Implement change password
                Alert.alert('Coming Soon', 'Change password feature will be available soon.');
              }}
            />
            
            <Divider />
            
            <List.Item
              title="Privacy Settings"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => {
                // TODO: Implement privacy settings
                Alert.alert('Coming Soon', 'Privacy settings feature will be available soon.');
              }}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          loading={isLoading}
          disabled={isLoading}
          style={[styles.logoutButton, { borderColor: theme.colors.error }]}
          labelStyle={{ color: theme.colors.error }}
          icon="logout"
        >
          {isLoading ? 'Logging Out...' : 'Logout'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing.lg,
    elevation: 4,
  },
  cardContent: {
    padding: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: spacing.lg,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body2,
  },
  sectionTitle: {
    ...typography.h5,
    marginBottom: spacing.md,
  },
  listItem: {
    paddingVertical: spacing.sm,
  },
  logoutButton: {
    marginTop: spacing.lg,
    borderRadius: 8,
  },
});

export default ProfileScreen; 