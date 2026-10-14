export interface SizeRow {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  bustOrChest: string;
  waist: string;
  hip: string;
  kameezLength: string;
  shoulder: string;
  sleeveLength: string;
  armhole?: string;
  trouserLength?: string;
}

export const WOMEN_PRET_INCHES: SizeRow[] = [
  { size: 'XS', bustOrChest: '34"', waist: '30"', hip: '37"', kameezLength: '41"', shoulder: '14.0"', sleeveLength: '21.5"', armhole: '8.0"', trouserLength: '37"' },
  { size: 'S',  bustOrChest: '36"', waist: '32"', hip: '39"', kameezLength: '42"', shoulder: '14.5"', sleeveLength: '22.0"', armhole: '8.5"', trouserLength: '38"' },
  { size: 'M',  bustOrChest: '39"', waist: '35"', hip: '42"', kameezLength: '43"', shoulder: '15.0"', sleeveLength: '22.5"', armhole: '9.0"', trouserLength: '39"' },
  { size: 'L',  bustOrChest: '43"', waist: '39"', hip: '46"', kameezLength: '44"', shoulder: '15.5"', sleeveLength: '23.0"', armhole: '9.5"', trouserLength: '40"' },
  { size: 'XL', bustOrChest: '47"', waist: '43"', hip: '50"', kameezLength: '45"', shoulder: '16.5"', sleeveLength: '23.5"', armhole: '10.0"', trouserLength: '40"' },
];

export const WOMEN_PRET_CM: SizeRow[] = [
  { size: 'XS', bustOrChest: '86.4 cm', waist: '76.2 cm', hip: '94.0 cm', kameezLength: '104.1 cm', shoulder: '35.6 cm', sleeveLength: '54.6 cm', armhole: '20.3 cm', trouserLength: '94.0 cm' },
  { size: 'S',  bustOrChest: '91.4 cm', waist: '81.3 cm', hip: '99.1 cm', kameezLength: '106.7 cm', shoulder: '36.8 cm', sleeveLength: '55.9 cm', armhole: '21.6 cm', trouserLength: '96.5 cm' },
  { size: 'M',  bustOrChest: '99.1 cm', waist: '88.9 cm', hip: '106.7 cm', kameezLength: '109.2 cm', shoulder: '38.1 cm', sleeveLength: '57.2 cm', armhole: '22.9 cm', trouserLength: '99.1 cm' },
  { size: 'L',  bustOrChest: '109.2 cm', waist: '99.1 cm', hip: '116.8 cm', kameezLength: '111.8 cm', shoulder: '39.4 cm', sleeveLength: '58.4 cm', armhole: '24.1 cm', trouserLength: '101.6 cm' },
  { size: 'XL', bustOrChest: '119.4 cm', waist: '109.2 cm', hip: '127.0 cm', kameezLength: '114.3 cm', shoulder: '41.9 cm', sleeveLength: '59.7 cm', armhole: '25.4 cm', trouserLength: '101.6 cm' },
];

export interface BottomSizeRow {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  waistRelaxed: string;
  waistStretched: string;
  hip: string;
  trouserLength: string;
  bottomOpening: string;
}

export const WOMEN_BOTTOMS_INCHES: BottomSizeRow[] = [
  { size: 'XS', waistRelaxed: '24"', waistStretched: '34"', hip: '38"', trouserLength: '37"', bottomOpening: '12"' },
  { size: 'S',  waistRelaxed: '26"', waistStretched: '36"', hip: '40"', trouserLength: '38"', bottomOpening: '13"' },
  { size: 'M',  waistRelaxed: '28"', waistStretched: '39"', hip: '43"', trouserLength: '39"', bottomOpening: '14"' },
  { size: 'L',  waistRelaxed: '31"', waistStretched: '43"', hip: '47"', trouserLength: '40"', bottomOpening: '15"' },
  { size: 'XL', waistRelaxed: '34"', waistStretched: '47"', hip: '51"', trouserLength: '40"', bottomOpening: '16"' },
];

export interface MenSizeRow {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  chest: string;
  neckCollar: string;
  shoulder: string;
  kurtaLength: string;
  sleeveLength: string;
  waistcoatChest: string;
}

export const MEN_PRET_INCHES: MenSizeRow[] = [
  { size: 'S',  chest: '38"', neckCollar: '15.0"', shoulder: '17.5"', kurtaLength: '40"', sleeveLength: '24.0"', waistcoatChest: '40"' },
  { size: 'M',  chest: '41"', neckCollar: '15.5"', shoulder: '18.5"', kurtaLength: '41"', sleeveLength: '24.5"', waistcoatChest: '43"' },
  { size: 'L',  chest: '44"', neckCollar: '16.0"', shoulder: '19.5"', kurtaLength: '42"', sleeveLength: '25.5"', waistcoatChest: '46"' },
  { size: 'XL', chest: '48"', neckCollar: '17.0"', shoulder: '20.5"', kurtaLength: '43"', sleeveLength: '26.0"', waistcoatChest: '50"' },
  { size: 'XXL', chest: '52"', neckCollar: '18.0"', shoulder: '21.5"', kurtaLength: '44"', sleeveLength: '26.5"', waistcoatChest: '54"' },
];

export const UNSTITCHED_YARDAGE_INFO = [
  { component: 'Shirt / Kameez Fabric', meters: '3.25 to 3.50 Meters', note: 'Sufficient for floor-length kurtas, flared A-line cuts, and full sleeves with embroidered borders.' },
  { component: 'Trouser / Shalwar Fabric', meters: '2.50 Meters', note: 'Standard yardage suitable for cigarette pants, straight trousers, or gathered traditional shalwars.' },
  { component: 'Dupatta / Shawl', meters: '2.50 to 2.75 Meters', note: 'Full length drape with embroidered pallus and laser-cut scalloped borders.' },
  { component: 'Under-Slip / Lining (For Chiffon/Sheer)', meters: '2.25 Meters', note: 'Soft pure cotton or crepe silk inner slip included for formal collections.' }
];

export const HOW_TO_MEASURE_GUIDELINES = [
  {
    title: 'Bust / Chest',
    instruction: 'Measure around the fullest part of your chest, keeping the tape measure horizontal and comfortably snug without digging in.'
  },
  {
    title: 'Kameez Length',
    instruction: 'Measure from the highest point of your shoulder seam near the neck, straight down to your desired hemline (knee, mid-calf, or ankle).'
  },
  {
    title: 'Shoulder',
    instruction: 'Measure horizontally from the outer edge of one shoulder bone across your back to the outer edge of the other shoulder bone.'
  },
  {
    title: 'Sleeve Length',
    instruction: 'Measure from the top tip of your shoulder down along your arm to the wrist bone.'
  },
  {
    title: 'Hip',
    instruction: 'Stand with feet together and measure around the fullest part of your hips/seat area.'
  },
  {
    title: 'Trouser / Shalwar Length',
    instruction: 'Measure from your natural waistline down to the ankle bone, taking into account heel height if you plan to wear traditional khussas or heels.'
  }
];

export function recommendSize(
  gender: 'women' | 'men',
  heightFeet: number,
  heightInches: number,
  weightKg: number,
  fitPreference: 'slim' | 'regular' | 'relaxed'
): {
  recommendedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  explanation: string;
  fitTip: string;
} {
  const totalHeightInches = heightFeet * 12 + heightInches;

  if (gender === 'women') {
    // Estimating standard Pakistani pret sizing based on BMI/weight benchmarks
    let calculatedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' = 'M';

    if (weightKg < 48) {
      calculatedSize = 'XS';
    } else if (weightKg < 57) {
      calculatedSize = 'S';
    } else if (weightKg < 68) {
      calculatedSize = 'M';
    } else if (weightKg < 80) {
      calculatedSize = 'L';
    } else {
      calculatedSize = 'XL';
    }

    // Apply fit adjustment
    if (fitPreference === 'relaxed') {
      if (calculatedSize === 'XS') calculatedSize = 'S';
      else if (calculatedSize === 'S') calculatedSize = 'M';
      else if (calculatedSize === 'M') calculatedSize = 'L';
      else if (calculatedSize === 'L') calculatedSize = 'XL';
    } else if (fitPreference === 'slim') {
      if (calculatedSize === 'XL') calculatedSize = 'L';
      else if (calculatedSize === 'L') calculatedSize = 'M';
      else if (calculatedSize === 'M') calculatedSize = 'S';
    }

    const lengthNote = totalHeightInches >= 67 
      ? 'Since your height is 5\'7" or above, standard 43" kameez will fall gracefully just above your knee.'
      : 'Standard kameez length will fall gracefully mid-calf, ideal with cigarette trousers.';

    return {
      recommendedSize: calculatedSize,
      explanation: `Based on your weight (${weightKg}kg) and ${fitPreference} styling preference, size ${calculatedSize} offers the most flattering drape.`,
      fitTip: `${lengthNote} All Zariya pret garments include 1.5 inches of internal side seam margins for effortless tailoring.`
    };
  } else {
    // Men's sizing
    let calculatedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' = 'M';

    if (weightKg < 62) {
      calculatedSize = 'S';
    } else if (weightKg < 74) {
      calculatedSize = 'M';
    } else if (weightKg < 86) {
      calculatedSize = 'L';
    } else if (weightKg < 98) {
      calculatedSize = 'XL';
    } else {
      calculatedSize = 'XXL';
    }

    if (fitPreference === 'relaxed' && calculatedSize !== 'XXL') {
      if (calculatedSize === 'S') calculatedSize = 'M';
      else if (calculatedSize === 'M') calculatedSize = 'L';
      else if (calculatedSize === 'L') calculatedSize = 'XL';
      else if (calculatedSize === 'XL') calculatedSize = 'XXL';
    }

    return {
      recommendedSize: calculatedSize,
      explanation: `Size ${calculatedSize} is tailored for your silhouette (${weightKg}kg) with comfortable armhole mobility for kurta wear.`,
      fitTip: 'Menswear prince waistcoats are cut with a tailored chest line. If planning to layer heavily, stay with your true size.'
    };
  }
}
