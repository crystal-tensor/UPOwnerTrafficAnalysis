export type Platform = 'bilibili' | 'tiktok' | 'douyin' | 'xiaohongshu' | 'youtube';
export type Language = 'zh' | 'en';

export interface SuggestionItem {
  title: string;
  description: string;
  score: number; // 0-100
  tags: string[];
  priority: 'High' | 'Medium' | 'Low';
}

export interface AIAnalysisReport {
  overallScore: number;
  summary: string;
  accountDiagnosis: SuggestionItem[];
  contentStrategy: SuggestionItem[];
  competitorGap: SuggestionItem[];
  actionPlan: string[];
}

const generateBilibiliAdvice = (lang: Language): AIAnalysisReport => {
  const isZh = lang === 'zh';
  return {
    overallScore: 78,
    summary: isZh 
      ? "该账号基础流量稳定，但互动率（弹幕/评论）有待提升。内容垂直度较高，建议在视频前30秒增加更多引导互动的埋点。"
      : "The account has stable base traffic, but engagement rate (danmaku/comments) needs improvement. Content is highly vertical; suggest adding more interaction prompts in the first 30 seconds.",
    accountDiagnosis: [
      {
        title: isZh ? "账号定位与人设" : "Account Positioning & Persona",
        description: isZh 
          ? "目前头像和简介较为通用，缺乏记忆点。建议结合B站二次元或玩梗文化，优化Banner图和置顶视频，打造更鲜明的UP主形象。"
          : "Avatar and bio are generic. Suggest incorporating Bilibili subculture elements into Banner and pinned videos to create a distinct creator persona.",
        score: 75,
        tags: isZh ? ["人设", "装修"] : ["Persona", "Design"],
        priority: "High"
      },
      {
        title: isZh ? "发布频率" : "Upload Frequency",
        description: isZh
          ? "更新频率不稳定，容易导致粉丝流失。建议固定每周五晚18:00更新，培养观众收视习惯。"
          : "Inconsistent upload schedule may lead to follower loss. Suggest fixing uploads to Friday 18:00 to build viewer habit.",
        score: 60,
        tags: isZh ? ["活跃度"] : ["Activity"],
        priority: "Medium"
      }
    ],
    contentStrategy: [
      {
        title: isZh ? "黄金前三秒" : "The Golden First 3 Seconds",
        description: isZh
          ? "视频开头节奏较慢，完播率受损。建议直接抛出视频高潮片段或悬念，提升5秒留存率。"
          : "Slow intro affects retention. Suggest starting with a highlight or cliffhanger to boost 5s retention.",
        score: 70,
        tags: isZh ? ["完播率", "剪辑"] : ["Retention", "Editing"],
        priority: "High"
      },
      {
        title: isZh ? "三连引导" : "Engagement Prompts (Sanlian)",
        description: isZh
          ? "缺少明显的点赞投币引导。建议设计专属的结束语或互动动作，提高互动数据权重。"
          : "Lacking clear calls-to-action for Likes/Coins. Suggest designing a unique outro to boost engagement weight.",
        score: 65,
        tags: isZh ? ["互动", "运营"] : ["Interaction", "Ops"],
        priority: "Medium"
      }
    ],
    competitorGap: [
      {
        title: isZh ? "选题差异化" : "Topic Differentiation",
        description: isZh
          ? "竞品账号更善于追踪B站热点（如近期鬼畜/生活区热梗）。建议关注B站热搜榜，将热点与自身内容结合。"
          : "Competitors are better at tracking Bilibili trends. Suggest monitoring trending topics and integrating them.",
        score: 80,
        tags: isZh ? ["热点", "选题"] : ["Trends", "Topics"],
        priority: "High"
      }
    ],
    actionPlan: isZh
      ? [
          "本周内更新头像和Banner，突出账号核心价值。",
          "下期视频尝试'预告-正片-彩蛋'的结构，缩短片头。",
          "在评论区置顶提问，诱导观众回复讨论。"
        ]
      : [
          "Update Avatar/Banner this week to highlight core value.",
          "Try 'Teaser-Main-Bonus' structure for next video; shorten intro.",
          "Pin a question in comments to trigger discussion."
        ]
  };
};

const generateTikTokDouyinAdvice = (lang: Language): AIAnalysisReport => {
  const isZh = lang === 'zh';
  return {
    overallScore: 82,
    summary: isZh
      ? "短视频节奏把控较好，但音乐选择略显陈旧。建议使用抖音/TikTok飙升榜BGM，并加强封面的点击欲望。"
      : "Pacing is good, but music choice is dated. Suggest using trending audio and improving cover click-through appeal.",
    accountDiagnosis: [
      {
        title: isZh ? "主页视觉统一性" : "Profile Visual Consistency",
        description: isZh
          ? "视频封面风格杂乱，不利于沉淀粉丝。建议统一封面字体和色调，形成品牌感。"
          : "Video covers are messy. Suggest unifying font and color palette to build brand identity.",
        score: 70,
        tags: isZh ? ["视觉", "封面"] : ["Visual", "Cover"],
        priority: "Medium"
      }
    ],
    contentStrategy: [
      {
        title: isZh ? "情绪价值" : "Emotional Value",
        description: isZh
          ? "内容偏向平铺直叙，缺乏情绪起伏。建议在脚本中加入'冲突-反转'结构，提升点赞率。"
          : "Content is too flat. Suggest adding 'Conflict-Twist' structure to boost likes.",
        score: 75,
        tags: isZh ? ["脚本", "情绪"] : ["Script", "Emotion"],
        priority: "High"
      },
      {
        title: isZh ? "BGM运用" : "BGM Usage",
        description: isZh
          ? "背景音乐未能有效卡点。建议使用剪映/CapCut的自动卡点功能，增强视觉冲击力。"
          : "BGM not synced well. Suggest using auto-sync features in CapCut for better visual impact.",
        score: 85,
        tags: isZh ? ["音乐", "剪辑"] : ["Music", "Editing"],
        priority: "Low"
      }
    ],
    competitorGap: [
      {
        title: isZh ? "评论区运营" : "Comment Section Ops",
        description: isZh
          ? "竞品通过神评论吸粉明显。建议准备一些'神回复'或争议性话题，引导评论区盖楼。"
          : "Competitors gain fans via witty comments. Suggest preparing 'god-tier replies' or controversial topics.",
        score: 60,
        tags: isZh ? ["评论", "运营"] : ["Comments", "Ops"],
        priority: "Medium"
      }
    ],
    actionPlan: isZh
      ? [
          "挑选3首当前热门BGM，重新剪辑库存素材发布。",
          "设计一套统一的封面模板（大字+高饱和度背景）。",
          "每天回复前10条评论，保持活跃度。"
        ]
      : [
          "Pick 3 trending songs and re-edit stock footage.",
          "Design a unified cover template (Big text + Saturated background).",
          "Reply to first 10 comments daily."
        ]
  };
};

const generateYoutubeAdvice = (lang: Language): AIAnalysisReport => {
  const isZh = lang === 'zh';
  return {
    overallScore: 70,
    summary: isZh
      ? "长视频SEO优化不足，搜索流量占比较低。缩略图（Thumbnail）点击率有很大提升空间。"
      : "Long-form SEO is weak; search traffic is low. Thumbnail CTR has significant room for improvement.",
    accountDiagnosis: [
      {
        title: isZh ? "频道关键词" : "Channel Keywords",
        description: isZh
          ? "频道未设置核心关键词，系统难以推荐给精准受众。建议完善关于页面的描述。"
          : "Channel lacks core keywords, making recommendation difficult. Suggest optimizing the About page.",
        score: 60,
        tags: isZh ? ["SEO", "设置"] : ["SEO", "Settings"],
        priority: "High"
      }
    ],
    contentStrategy: [
      {
        title: isZh ? "缩略图设计" : "Thumbnail Design",
        description: isZh
          ? "封面文字过多，移动端难以看清。建议使用'大脸+夸张表情+短文案'的组合，提升CTR。"
          : "Cover text is too small for mobile. Suggest 'Big Face + Expression + Short Copy' to boost CTR.",
        score: 65,
        tags: isZh ? ["点击率", "设计"] : ["CTR", "Design"],
        priority: "High"
      },
      {
        title: isZh ? "完播率优化" : "Retention Optimization",
        description: isZh
          ? "视频中段流失严重。建议每2-3分钟插入一个视觉变化（B-roll或转场），打破枯燥感。"
          : "High drop-off in middle. Suggest inserting visual changes (B-roll/transitions) every 2-3 mins.",
        score: 72,
        tags: isZh ? ["留存", "剪辑"] : ["Retention", "Editing"],
        priority: "Medium"
      }
    ],
    competitorGap: [
      {
        title: isZh ? "Shorts引流" : "Shorts Traffic",
        description: isZh
          ? "竞品频繁利用Shorts引流至长视频。建议将长视频高光片段剪辑为Shorts，并在评论区挂长视频链接。"
          : "Competitors use Shorts to drive traffic. Suggest clipping highlights into Shorts and linking full video.",
        score: 50,
        tags: isZh ? ["Shorts", "引流"] : ["Shorts", "Traffic"],
        priority: "Medium"
      }
    ],
    actionPlan: isZh
      ? [
          "使用TubeBuddy/VidIQ优化视频标题和标签。",
          "重新设计最近5个视频的封面图进行A/B测试。",
          "每周发布2-3条Shorts为长视频导流。"
        ]
      : [
          "Use TubeBuddy/VidIQ to optimize titles/tags.",
          "Redesign covers for last 5 videos for A/B testing.",
          "Post 2-3 Shorts weekly to drive traffic to long videos."
        ]
  };
};

const generateXiaohongshuAdvice = (lang: Language): AIAnalysisReport => {
    const isZh = lang === 'zh';
    return {
      overallScore: 85,
      summary: isZh
        ? "笔记图文质量较高，但首图吸引力略显不足。建议加强'利他性'标题的撰写，提升收藏率。"
        : "Image/Text quality is high, but cover image lacks pull. Suggest strengthening 'altruistic' titles to boost saves.",
      accountDiagnosis: [
      {
        title: isZh ? "个人简介" : "Bio",
        description: isZh
          ? "简介未突出账号的垂直领域。建议增加'我是谁+我能提供什么价值'的描述。"
          : "Bio doesn't highlight niche. Suggest adding 'Who am I + What value I provide'.",
        score: 80,
        tags: isZh ? ["人设"] : ["Persona"],
        priority: "High"
      }
    ],
    contentStrategy: [
      {
        title: isZh ? "爆款标题公式" : "Viral Title Formula",
        description: isZh
          ? "标题过于文艺，缺乏点击冲动。建议尝试：'痛点+解决方案+情绪价值'的组合公式。"
          : "Titles are too poetic, lacking click impulse. Try: 'Pain Point + Solution + Emotion'.",
        score: 70,
        tags: isZh ? ["标题", "文案"] : ["Title", "Copy"],
        priority: "High"
      },
      {
        title: isZh ? "关键词布局" : "Keyword Layout",
        description: isZh
          ? "正文未覆盖搜索长尾词。建议在文末增加相关话题标签（Hashtags），增加搜索曝光。"
          : "Body text misses long-tail keywords. Suggest adding relevant hashtags at the end.",
        score: 88,
        tags: isZh ? ["SEO", "标签"] : ["SEO", "Tags"],
        priority: "Medium"
      }
    ],
    competitorGap: [
      {
        title: isZh ? "评论区互动" : "Comment Interaction",
        description: isZh
          ? "竞品经常在评论区组织抽奖或问答。建议定期举办宠粉活动，激活僵尸粉。"
          : "Competitors host giveaways/Q&A. Suggest regular fan events to activate dormant followers.",
        score: 65,
        tags: isZh ? ["运营", "活动"] : ["Ops", "Events"],
        priority: "Medium"
      }
    ],
      actionPlan: isZh
        ? [
            "收集同赛道前10篇爆款笔记的标题，建立标题库。",
            "优化首图，增加关键信息贴纸。",
            "每篇笔记末尾增加'关注我，不迷路'的引导图。"
          ]
        : [
            "Collect top 10 viral titles in niche to build a library.",
            "Optimize cover image with key info stickers.",
            "Add 'Follow me' guide image at end of notes."
          ]
    };
  };

export const generateAIAnalysis = (platform: Platform, lang: Language): AIAnalysisReport => {
  switch (platform) {
    case 'bilibili':
      return generateBilibiliAdvice(lang);
    case 'tiktok':
    case 'douyin':
      return generateTikTokDouyinAdvice(lang);
    case 'youtube':
      return generateYoutubeAdvice(lang);
    case 'xiaohongshu':
        return generateXiaohongshuAdvice(lang);
    default:
      return generateBilibiliAdvice(lang);
  }
};
