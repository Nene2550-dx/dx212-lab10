import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Menu } from "../lib/logic";
import { COLORS, SPACING } from "../lib/theme";

type MenuCardProps = {
  menu: Menu;
  onPress?: () => void;
};

export default function MenuCard({ menu, onPress }: MenuCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{menu.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.meta}>
          {menu.category}
          {menu.spicy ? " · เผ็ด" : ""}
        </Text>
      </View>
      <Text style={styles.price}>{menu.price} ฿</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  meta: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  price: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
});
