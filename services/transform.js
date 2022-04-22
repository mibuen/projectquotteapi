exports.transform = (data) => {
  return data.map((item) => {
    return {
      cotizacionId: item.cotizacionId,
      proyectoId: item.proyectoId,
      cliente: item.proyectos_ready.cliente,
      trabajo: item.proyectos_ready.trabajo,
      sitio: item.sitio,
      direccion: item.direccion,
      supervisor: item.supervisor,
      status: item.status,
      inicio: item.inicio,
      terminado: item.terminado,
      factura: item.factura,
      //vistas: item.vistas ? item.vistas.length : 0,
      //fotos: item.empezar.length + item.terminar.length,
      fotosEmpezar: item.empezar,
      fotosTerminar: item.terminar,
      reporte: item.reporte,
      //totalReportes: item.reporte.length || 0,
    }
  })
}
