<script setup lang="ts">
import TravelFormWidget from '@/components/widgets/TravelFormWidget.vue'
import HeroArticleWidget from '@/components/widgets/HeroArticleWidget.vue'
import vacances from '@/assets/vacances.png'
import tempsLibre from '@/assets/temps-libre.png'
import comptabilite from '@/assets/comptabilite.png'
import photos from '@/assets/des-photos.png'
import beach from '@/assets/beach.jpg'
import airplane from '@/assets/airplane.jpg'
import mountain from '@/assets/mountain.jpg'
import zetong from '@/assets/zetong.jpg'
import CarouselWidget from '@/components/widgets/CarouselWidget.vue'
import { useHead } from '@unhead/vue'
useHead({
  title: 'Ovoyage le super site de voyage',
  meta: [
    {
      name: 'description',
      content: 'Ovoyage est un site de voyage qui vous permet de gérer votre voyage de A à Z'
    },
    {
      name: 'keywords',
      content: 'voyage, gestion, budget, amis, famille, photos'
    }
  ]
})

const images = [
  {
    src: beach,
    alt: 'Une plage paradisiaque'
  },
  {
    src: airplane,
    alt: 'Un avion'
  },
  {
    src: mountain,
    alt: 'Une montagne'
  },
  {
    src: zetong,
    alt: 'Un zetong'
  }
]

const articles = [
  {
    title: 'Invitez vos compagnons de voyage !',
    description: `Créez un compte et invitez vos amis et votre famille à vous
                rejoindre dans votre périple ! Chacun pourra participer ou non
                aux différentes activités programmées, savoir d'un coup d'oeil
                où dormir, prendre les repas et comment organiser son temps
                autour des activités programmées !`,
    image: vacances,
    imageAlt: 'Deux personnes qui partent en vacances ensemble',
    imagePosition: 'left',
    bgColor: 'bg-yellow-200',
    bgArticle: 'bg-yellow-100'
  },
  {
    title: 'Gérez votre voyage de chez vous',
    description: `Gérer l'intégralité de votre voyage depuis chez vous. Plannifiez
                votre destinations, vos étapes au cours de votre voyage, où vous
                passez vos nuits, où vous allez manger, programmez vos activités
                et les participants à ces activités. Tout est possible !`,
    image: tempsLibre,
    imageAlt: 'Une personne qui gère son voyage depuis chez elle',
    imagePosition: 'right',
    bgColor: 'bg-orange-200',
    bgArticle: 'bg-orange-100'
  },
  {
    title: 'Gérez votre budget',
    description: `Gérez votre budget en toute simplicité. Chaque participant
                peut ajouter ses dépenses et les répartir entre les autres
                participants. Vous pouvez également ajouter des dépenses
                communes à tous les participants.`,
    image: comptabilite,
    imageAlt: 'Une calculatrice pour gérer son budget',
    imagePosition: 'left',
    bgColor: 'bg-sky-200',
    bgArticle: 'bg-sky-100'
  },
  {
    title: 'Partagez vos souvenirs',
    description: `Partagez vos photos et vos souvenirs en stockant vos plus belles
                photos sur notre site. Vous pourrez les partager avec vos amis
                et votre famille et les télécharger pour les conserver.`,
    image: photos,
    imageAlt: 'Trois photos de voyages',
    imagePosition: 'right',
    bgColor: 'bg-indigo-200',
    bgArticle: 'bg-indigo-100'
  }
]
</script>
<template>
  <div class="flex flex-col gap-y-6">
    <TravelFormWidget />
    <CarouselWidget :images="images" />
    <HeroArticleWidget
      v-for="article in articles"
      :key="article.title"
      :title="article.title"
      :description="article.description"
      :image="article.image"
      :imageAlt="article.imageAlt"
      :imagePosition="article.imagePosition"
      :bgColor="article.bgColor"
      :bgArticle="article.bgArticle"
    />
  </div>
</template>

<style scoped></style>
