import { getPertidaksamaanLinear, getSPLDV, getPGL } from './content/kelas10';
import { getLogikaMatematika, getInduksiMatematika } from './content/kelas11';
import { getGeometriBidangDatar, getGeometriBidangRuang } from './content/kelas12';

export function getChapterData(title: string) {
  switch(title) {
    case "Pertidaksamaan Linear": return getPertidaksamaanLinear();
    case "Sistem Persamaan Linear": return getSPLDV();
    case "Persamaan Garis Lurus": return getPGL();
    case "Logika Matematika": return getLogikaMatematika();
    case "Induksi Matematika": return getInduksiMatematika();
    case "Geometri Bidang Datar": return getGeometriBidangDatar();
    case "Geometri Bidang Ruang": return getGeometriBidangRuang();
    default: return getPertidaksamaanLinear(); // Fallback
  }
}
