import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Rule, RuleCategory } from '../types/rules';

export function useRuleLibrary(platformId: string) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [categories, setCategories] = useState<RuleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 并行获取规则和分类
        const [rulesResponse, categoriesResponse] = await Promise.all([
          supabase
            .from('platform_rules')
            .select('*')
            .eq('platform_id', platformId)
            .order('updated_at', { ascending: false }),
          supabase
            .from('rule_categories')
            .select('*')
            .eq('platform_id', platformId)
        ]);

        if (rulesResponse.error) throw rulesResponse.error;
        if (categoriesResponse.error) throw categoriesResponse.error;

        setRules(rulesResponse.data as Rule[]);
        setCategories(categoriesResponse.data as RuleCategory[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch rule library'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platformId]);

  return { rules, categories, loading, error };
}