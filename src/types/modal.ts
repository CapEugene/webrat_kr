export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface DeveloperData {
  firstName: string;
  lastName: string;
}

export interface AddDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (developerData: DeveloperData) => void;
}

export interface ModerationRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameName: string;
  initialFilterWords: string[];
  onSave: (initialWords: string[]) => void;
}

export interface Developer {
  id: string;
  name: string;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface Platform {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface GameData {
  title: string;
  description: string;
  coverUrl: string;
  developers: string[];
  publishers: string[];
  platforms: string[];
  genres: string[];
}

export interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gameData: GameData) => void;
  availableDevelopers: Developer[];
  availablePublishers: Publisher[];
  availablePlatforms: Platform[];
  availableGenres: Genre[];
}

export interface AddGenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (genreName: string) => void;
}

export interface AddPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platformName: string) => void;
}

export interface PublisherData {
  name: string;
  country: string;
  foundationDate: string;
}

export interface AddPublisherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (publisherData: PublisherData) => void;
}

export interface AdditionalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RatingCalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameName: string;
  initialValues?: Record<number, number>;
  onSave: (values: Record<number, number>) => void;
}

export type UserRole = "user" | "moderator" | "admin";

export interface RoleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  currentRole: UserRole;
  onSave: (userId: string, newRole: UserRole) => void;
}
