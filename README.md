#Website link: https://websitestaging.github.io/front-v2.8.0/html/home/index.html

1. Initialize repository by clicking on Fork sign> Initialize repository [taskbar]. Select the folder which have the source files.
2. After initializing you'll see all the files in your VSCode locally.
3. Wirte commit message & click on tick sign in top left corner. The local files will get disappeared from 'Changes'
4. git remote add origin https://github.com/websitestaging/HH.git (If needed to remove origin: )
5. Push the changes
6. Put the username and password
7. Done

--create or replace vw_dlvr_3po_ord_id_v2
SELECT top 100
       T1.terr_cd
       ,T1.mcd_gbal_lcat_id_nu
       ,T2.mcd_gbal_lcat_id_nu
       ,T1.dlvr_3po_ord_id
       ,T2.dlvr_3po_ord_id
       ,T1.dlvr_3po_ord_tot_dura_mi_qt
       ,T1.rte_tm_mi_qt
       ,T1.curr_trip_beg_dura_mi_qt
       ,T1.ffll_tm_dura_mi_qt
       ,T1.tot_tax_am
       ,T1.tot_net_trn_am
       ,T2.pos_tot_tax_am
       ,T2.pos_tot_net_trn_am
       
,case      when TRIM(T1.dlvr_3po_ord_id)=TRIM(T2.dlvr_3po_ord_id)  THEN 1
ELSE 0
END AS BOTH_MATCH_FL
,case      when TRIM(T1.dlvr_3po_ord_id)<>TRIM(T2.dlvr_3po_ord_id) AND (T2.dlvr_3po_ord_id IS NULL) AND (T1.dlvr_3po_ord_id IS NOT NULL)   THEN 1
ELSE 0
END AS DLVR_3PO_MATCH_FL
,case      when TRIM(T1.dlvr_3po_ord_id)<>TRIM(T2.dlvr_3po_ord_id) AND (T2.dlvr_3po_ord_id IS NOT NULL) AND (T1.dlvr_3po_ord_id IS NULL)   THEN 1
ELSE 0
END AS STLD_MATCH_FL
,CASE      WHEN TRIM(T1.dlvr_3po_ord_id)=TRIM(T2.dlvr_3po_ord_id) AND (T1.tot_tax_am=T2.pos_tot_tax_am) AND (T1.tot_net_trn_am=T2.pos_tot_net_trn_am) THEN 1
ELSE 0
END AS TRN_TAX_FL
from 
(SELECT top 100
       T1.terr_cd
       ,T1.mcd_gbal_lcat_id_nu
       ,T2.mcd_gbal_lcat_id_nu
       ,T1.dlvr_3po_ord_id
       ,T2.dlvr_3po_ord_id
       ,T1.dlvr_3po_ord_tot_dura_mi_qt
       ,T1.rte_tm_mi_qt
       ,T1.curr_trip_beg_dura_mi_qt
       ,T1.ffll_tm_dura_mi_qt
       ,T1.tot_tax_am
       ,T1.tot_net_trn_am
       ,T2.pos_tot_tax_am
       ,T2.pos_tot_net_trn_am
from rmdw_tables.dlvr_3po_ord T1
left OUTER JOIN
rmdw_tables.pos_trn_lvl_hdr T2 ON 
T1.terr_cd = T2.terr_cd 
and T1.mcd_gbal_lcat_id_nu=T2.mcd_gbal_lcat_id_nu
and T1.dlvr_3po_ord_id = T2.dlvr_3po_ord_id
and T1.dlvr_3po_busn_dt=T2.pos_busn_dt
where T1.terr_cd='840'
and   T2.dlvr_3po_na='UberEats'
) 
union 
(SELECT 
       T1.terr_cd
       ,T1.mcd_gbal_lcat_id_nu
       ,T2.mcd_gbal_lcat_id_nu
       ,T1.dlvr_3po_ord_id
       ,T2.dlvr_3po_ord_id
       ,T1.dlvr_3po_ord_tot_dura_mi_qt
       ,T1.rte_tm_mi_qt
       ,T1.curr_trip_beg_dura_mi_qt
       ,T1.ffll_tm_dura_mi_qt
       ,T1.tot_tax_am
       ,T1.tot_net_trn_am
       ,T2.pos_tot_tax_am
       ,T2.pos_tot_net_trn_am
from rmdw_tables.pos_trn_lvl_hdr T2
left OUTER JOIN
rmdw_tables.dlvr_3po_ord T1 ON 
T1.terr_cd = T2.terr_cd 
and T1.mcd_gbal_lcat_id_nu=T2.mcd_gbal_lcat_id_nu
and T1.dlvr_3po_ord_id = T2.dlvr_3po_ord_id
and T1.dlvr_3po_busn_dt=T2.pos_busn_dt
where T1.terr_cd='840'
and   T2.dlvr_3po_na='UberEats'
)       
