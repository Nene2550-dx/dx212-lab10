import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import MenuCard from "../../components/MenuCard";
import { filterByBudget, searchByName, sortByPrice } from "../../lib/logic";
import { useMenus } from "../../lib/MenuContext";
import { COLORS, SPACING } from "../../lib/theme";

export default function Home() {
  const { menus, loading, error, reload } = useMenus();
  const [budget, setBudget] = useState(60);
  const [keyword, setKeyword] = useState("");

  const inBudget = filterByBudget(menus, budget);
  const result = sortByPrice(searchByName(inBudget, keyword));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="🔍 ค้นหาเมนู เช่น ข้าว"
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.budgetRow}>
        <Pressable
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => setBudget(budget - 10)}
        >
          <Text style={styles.btnText}>-10</Text>
        </Pressable>
        <Text style={styles.budget}>งบ {budget} บาท</Text>
        <Pressable
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => setBudget(budget + 10)}
        >
          <Text style={styles.btnText}>+10</Text>
        </Pressable>
      </View>

      <Link href="/about" style={styles.link}>
        เกี่ยวกับแอป →
      </Link>

      <View style={styles.countRow}>
        <Text style={styles.count}>พบ {result.length} เมนู</Text>
        <Pressable
          onPress={reload}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Text style={styles.reload}>
            {loading ? "กำลังโหลด..." : "↻ โหลดใหม่"}
          </Text>
        </Pressable>
      </View>

      {error !== null && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>โหลดเมนูไม่สำเร็จ: {error}</Text>
          <Pressable style={styles.btnTry} onPress={reload}>
            <Text style={styles.btnText}>ลองใหม่</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={result}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => (
          <MenuCard
            menu={item}
            onPress={() => router.push(`/menu/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingBottom: SPACING.lg }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={styles.loader} color={COLORS.primary} />
          ) : (
            <Text style={styles.empty}>ไม่พบเมนูตามเงื่อนไข</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
  },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 0,
    borderRadius: 99,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  count: {
    color: COLORS.muted,
  },
  reload: {
    color: COLORS.primary,
    fontWeight: "bold",
    padding: SPACING.sm,
  },
  errorBox: {
    backgroundColor: "#FDECEA",
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 16,
    alignItems: "center",
    gap: SPACING.sm,
  },
  errorText: {
    color: COLORS.danger,
  },
  loader: {
    marginTop: SPACING.lg,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  btn: {
    minWidth: 60,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  btnTry: {
    minWidth: 80,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: COLORS.danger,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  budget: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: SPACING.lg,
  },
});
