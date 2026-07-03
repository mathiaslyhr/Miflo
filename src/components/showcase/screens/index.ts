// Barrel for the showcase screens — keeps `@/components/showcase/screens`
// imports working after the split into domain files. Screen content only; wrap
// each in <PhoneFrame>.
export { ordinal } from "./shared";
export { HomeScreen, CreateRoomScreen, JoinRoomScreen } from "./home";
export {
  GamesScreen,
  OddOneOutConfigScreen,
  MissingXIConfigScreen,
} from "./games";
export { LobbyScreen, EmptyLobbyScreen, LeaveRoomSheet } from "./lobby";
export {
  OddOneOutScreen,
  OddOneOutRevealScreen,
  MissingXIScreen,
  MissingXIRevealScreen,
  CountdownScreen,
  RevealScreen,
  WaitingScreen,
  ToastDemoScreen,
} from "./play";
export { LeaderboardScreen, RoundSummaryScreen, ResultsScreen } from "./results";
export {
  MenuScreen,
  ProfileScreen,
  StatsScreen,
  SettingsScreen,
  AboutScreen,
} from "./menu";
export {
  MessageScreen,
  RoomNotFoundScreen,
  RoomFullScreen,
  LoadingScreen,
  ReconnectingScreen,
} from "./system";
