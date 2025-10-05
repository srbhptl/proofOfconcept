import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import categories from './src/assets/data';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MultiLevelCategories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(
    selectedCategory.subcategories[0].id
  );
  const selectedSubcategory = selectedCategory.subcategories.find(sc => sc.id === selectedSubcategoryId);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <ScrollView horizontal style={styles.topNav} showsHorizontalScrollIndicator={false}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => {
              setSelectedCategoryId(cat.id);
              setSelectedSubcategoryId(cat.subcategories[0]?.id || null);
            }}
            style={[
              styles.categoryButton,
              cat.id === selectedCategoryId && styles.categorySelected,
            ]}
          >
            <Text style={cat.id === selectedCategoryId ? styles.categoryTextSelected : styles.categoryText}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Left Panel - Subcategories */}
        <ScrollView style={styles.leftPanel} showsVerticalScrollIndicator={false}>
          {selectedCategory.subcategories.map(sc => (
            <TouchableOpacity
              key={sc.id}
              onPress={() => setSelectedSubcategoryId(sc.id)}
              style={[
                styles.subcategoryButton,
                sc.id === selectedSubcategoryId && styles.subcategorySelected,
              ]}
            >
              <Text style={sc.id === selectedSubcategoryId ? styles.subcategoryTextSelected : styles.subcategoryText}>
                {sc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Right Panel - Items */}
        <ScrollView style={styles.rightPanel} showsVerticalScrollIndicator={false}>
          {selectedSubcategory.items.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.detailsList}>
                {item.details.map((detail, idx) => (
                  <View key={idx} style={styles.detailBox}>
                    <Text style={styles.detailText}>{detail}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const COLORS = {
  background: '#fafafa',
  primary: '#007aff',
  textPrimary: '#1c1c1e',
  textSecondary: '#6e6e73',
  panelBackground: '#ffffff',
  border: '#d1d1d6',
  detailBackground: '#e5e5ea',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topNav: {
    maxHeight: 44,
    backgroundColor: COLORS.panelBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  categorySelected: {
    borderBottomColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: COLORS.panelBackground,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  subcategoryButton: {
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  subcategorySelected: {
    backgroundColor: COLORS.detailBackground,
  },
  subcategoryText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  subcategoryTextSelected: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  rightPanel: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: COLORS.panelBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    marginBottom: 24,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  detailsList: {
    flexDirection: 'row',
  },
  detailBox: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 12,
    backgroundColor: COLORS.detailBackground,
    borderRadius: 14,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
