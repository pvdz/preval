# Preval test case

# param_used_once.md

> Tofix > param used once
>
> A parameter that is used once in an assignment to another variable should be eliminated or whatever.

## Input

`````js filename=intro
function TP$cloneX2$cloneX1(fNeX1786, mNeX765, hNeX475, gNeX352, yNeX272) {
    var BNeX51;
    var DNeX65;
    var ENeX311;
    var FNeX55;
    var HNeX48;
    var INeX72;
    var KNeX38;
    var LNeX86;
    var MNeX63;
    var PNeX191;
    var QNeX102;
    var RNeX72;
    var TNeX211;
    var UNeX80;
    var VNeX53;
    var XNeX77;
    var ZNeX45;
    var jNeX68;
    var kNeX164;
    var vNeX134;
    var wNeX70;
    let SSA_bNeX94 = mNeX765;
    let SSA_xNeX108 = gNeX352;
    let SSA_SNeX76 = yNeX272;
    while (true) {
      const fooBinBothRhsX4240 = typeof SSA_SNeX76;
      const fooIfTestX13134 = "number" == fooBinBothRhsX4240;
      if (fooIfTestX13134) {
        const fooReturnArgX5593 = YE$cloneX5(SSA_bNeX94, $, SSA_xNeX108);
        return fooReturnArgX5593;
      }
      const fooSwitchTestX186 = SSA_SNeX76[0];
      let fooSwitchCaseToStartX352 = 24;
      const fooIfTestX13135 = 0 === fooSwitchTestX186;
      if (fooIfTestX13135) {
        fooSwitchCaseToStartX352 = 0;
      } else {
        const fooIfTestX13161 = 1 === fooSwitchTestX186;
        if (fooIfTestX13161) {
          fooSwitchCaseToStartX352 = 1;
        } else {
          const fooIfTestX13162 = 2 === fooSwitchTestX186;
          if (fooIfTestX13162) {
            fooSwitchCaseToStartX352 = 2;
          } else {
            const fooIfTestX13163 = 3 === fooSwitchTestX186;
            if (fooIfTestX13163) {
              fooSwitchCaseToStartX352 = 3;
            } else {
              const fooIfTestX13164 = 4 === fooSwitchTestX186;
              if (fooIfTestX13164) {
                fooSwitchCaseToStartX352 = 4;
              } else {
                const fooIfTestX13165 = 5 === fooSwitchTestX186;
                if (fooIfTestX13165) {
                  fooSwitchCaseToStartX352 = 5;
                } else {
                  const fooIfTestX13166 = 6 === fooSwitchTestX186;
                  if (fooIfTestX13166) {
                    fooSwitchCaseToStartX352 = 6;
                  } else {
                    const fooIfTestX13167 = 7 === fooSwitchTestX186;
                    if (fooIfTestX13167) {
                      fooSwitchCaseToStartX352 = 7;
                    } else {
                      const fooIfTestX13168 = 8 === fooSwitchTestX186;
                      if (fooIfTestX13168) {
                        fooSwitchCaseToStartX352 = 8;
                      } else {
                        const fooIfTestX13169 = 9 === fooSwitchTestX186;
                        if (fooIfTestX13169) {
                          fooSwitchCaseToStartX352 = 9;
                        } else {
                          const fooIfTestX13170 = 10 === fooSwitchTestX186;
                          if (fooIfTestX13170) {
                            fooSwitchCaseToStartX352 = 10;
                          } else {
                            const fooIfTestX13171 = 11 === fooSwitchTestX186;
                            if (fooIfTestX13171) {
                              fooSwitchCaseToStartX352 = 11;
                            } else {
                              const fooIfTestX13172 = 12 === fooSwitchTestX186;
                              if (fooIfTestX13172) {
                                fooSwitchCaseToStartX352 = 12;
                              } else {
                                const fooIfTestX13173 = 13 === fooSwitchTestX186;
                                if (fooIfTestX13173) {
                                  fooSwitchCaseToStartX352 = 13;
                                } else {
                                  const fooIfTestX13174 = 14 === fooSwitchTestX186;
                                  if (fooIfTestX13174) {
                                    fooSwitchCaseToStartX352 = 14;
                                  } else {
                                    const fooIfTestX13175 = 15 === fooSwitchTestX186;
                                    if (fooIfTestX13175) {
                                      fooSwitchCaseToStartX352 = 15;
                                    } else {
                                      const fooIfTestX13176 = 16 === fooSwitchTestX186;
                                      if (fooIfTestX13176) {
                                        fooSwitchCaseToStartX352 = 16;
                                      } else {
                                        const fooIfTestX13177 = 17 === fooSwitchTestX186;
                                        if (fooIfTestX13177) {
                                          fooSwitchCaseToStartX352 = 17;
                                        } else {
                                          const fooIfTestX13178 = 18 === fooSwitchTestX186;
                                          if (fooIfTestX13178) {
                                            fooSwitchCaseToStartX352 = 18;
                                          } else {
                                            const fooIfTestX13179 = 19 === fooSwitchTestX186;
                                            if (fooIfTestX13179) {
                                              fooSwitchCaseToStartX352 = 19;
                                            } else {
                                              const fooIfTestX13180 = 20 === fooSwitchTestX186;
                                              if (fooIfTestX13180) {
                                                fooSwitchCaseToStartX352 = 20;
                                              } else {
                                                const fooIfTestX13181 = 21 === fooSwitchTestX186;
                                                if (fooIfTestX13181) {
                                                  fooSwitchCaseToStartX352 = 21;
                                                } else {
                                                  const fooIfTestX13182 = 22 === fooSwitchTestX186;
                                                  if (fooIfTestX13182) {
                                                    fooSwitchCaseToStartX352 = 22;
                                                  } else {
                                                    const fooIfTestX13183 = 23 === fooSwitchTestX186;
                                                    if (fooIfTestX13183) {
                                                      fooSwitchCaseToStartX352 = 23;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      const fooIfTestX13136 = fooSwitchCaseToStartX352 <= 0;
      if (fooIfTestX13136) {
        ENeX311 = SSA_SNeX76[1];
        const fooReturnArgX5594 = function (nCeX399) {
          const fooCalleeParamX11228 = SSA_bNeX94;
          const fooCalleeParamX11229 = [5, SSA_xNeX108, nCeX399];
          const fooCalleeParamX11230 = ENeX311;
          const fooReturnArgX5595 = RP$cloneX5(fooCalleeParamX11228, $, fooCalleeParamX11229, fooCalleeParamX11230);
          return fooReturnArgX5595;
        };
        return fooReturnArgX5594;
      }
      const fooIfTestX13137 = fooSwitchCaseToStartX352 <= 1;
      if (fooIfTestX13137) {
        TNeX211 = SSA_SNeX76[1];
        const fooReturnArgX5596 = function (nCeX400) {
          const fooCalleeParamX11231 = SSA_bNeX94;
          const fooArrElementX3211 = SSA_xNeX108;
          const fooCalleeParamX11232 = XT(nCeX400);
          const fooCalleeParamX11233 = Jq;
          const fooArrElementX3213 = __(fooCalleeParamX11232, fooCalleeParamX11233);
          const fooCalleeParamX11234 = [4, fooArrElementX3211, fooArrElementX3213];
          const fooCalleeParamX11235 = TNeX211;
          const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, fooCalleeParamX11235);
          return fooReturnArgX5597;
        };
        return fooReturnArgX5596;
      }
      const fooIfTestX13138 = fooSwitchCaseToStartX352 <= 2;
      if (fooIfTestX13138) {
        const _NeX233 = SSA_SNeX76[2];
        const ANeX206 = SSA_SNeX76[1];
        const fooCalleeParamX11236 = SSA_bNeX94;
        const fooCalleeParamX11237 = SSA_xNeX108;
        const fooCalleeParamX11238 = function (nCeX401) {
          return nCeX401;
        };
        const SSA_fooReturnArgX138 = NP$cloneX2$clone($, fooCalleeParamX11236, $, fooCalleeParamX11237, _NeX233, ANeX206, fooCalleeParamX11238);
        return SSA_fooReturnArgX138;
      }
      const fooIfTestX13139 = fooSwitchCaseToStartX352 <= 3;
      if (fooIfTestX13139) {
        const fooCalleeParamX11239 = SSA_bNeX94;
        const fooCalleeParamX11240 = SSA_xNeX108;
        const fooCalleeParamX11241 = SSA_SNeX76[2];
        const fooCalleeParamX11242 = SSA_SNeX76[1];
        const SSA_fooReturnArgX139 = NP$cloneX2$clone($, fooCalleeParamX11239, $, fooCalleeParamX11240, fooCalleeParamX11241, fooCalleeParamX11242, WA);
        return SSA_fooReturnArgX139;
      }
      const fooIfTestX13140 = fooSwitchCaseToStartX352 <= 4;
      if (fooIfTestX13140) {
        const fooCalleeParamX11243 = SSA_bNeX94;
        const fooCalleeParamX11244 = SSA_xNeX108;
        const fooCalleeParamX11245 = SSA_SNeX76[4];
        const fooCalleeParamX11246 = SSA_SNeX76[2];
        const fooCalleeParamX11247 = SSA_SNeX76[3];
        const fooCalleeParamX11248 = SSA_SNeX76[1];
        const SSA_fooReturnArgX140 = LP$cloneX2$clone($, fooCalleeParamX11243, $, fooCalleeParamX11244, fooCalleeParamX11245, fooCalleeParamX11246, fooCalleeParamX11247, ZA, fooCalleeParamX11248);
        return SSA_fooReturnArgX140;
      }
      const fooIfTestX13141 = fooSwitchCaseToStartX352 <= 5;
      if (fooIfTestX13141) {
        const fooCalleeParamX11249 = SSA_bNeX94;
        const fooCalleeParamX11250 = SSA_xNeX108;
        const fooCalleeParamX11251 = SSA_SNeX76[4];
        const fooCalleeParamX11252 = SSA_SNeX76[2];
        const fooCalleeParamX11253 = SSA_SNeX76[3];
        const fooCalleeParamX11254 = SSA_SNeX76[1];
        const SSA_fooReturnArgX141 = LP$cloneX2$clone($, fooCalleeParamX11249, $, fooCalleeParamX11250, fooCalleeParamX11251, fooCalleeParamX11252, fooCalleeParamX11253, KA, fooCalleeParamX11254);
        return SSA_fooReturnArgX141;
      }
      const fooIfTestX13142 = fooSwitchCaseToStartX352 <= 6;
      if (fooIfTestX13142) {
        const fooCalleeParamX11255 = SSA_bNeX94;
        const fooCalleeParamX11256 = SSA_xNeX108;
        const fooCalleeParamX11257 = SSA_SNeX76[4];
        const fooCalleeParamX11258 = SSA_SNeX76[2];
        const fooCalleeParamX11259 = SSA_SNeX76[3];
        const fooCalleeParamX11260 = SSA_SNeX76[1];
        const SSA_fooReturnArgX142 = LP$cloneX2$clone($, fooCalleeParamX11255, $, fooCalleeParamX11256, fooCalleeParamX11257, fooCalleeParamX11258, fooCalleeParamX11259, QA, fooCalleeParamX11260);
        return SSA_fooReturnArgX142;
      }
      const fooIfTestX13143 = fooSwitchCaseToStartX352 <= 7;
      if (fooIfTestX13143) {
        const fooCalleeParamX11261 = SSA_bNeX94;
        const fooCalleeParamX11262 = SSA_xNeX108;
        const fooCalleeParamX11263 = SSA_SNeX76[4];
        const fooCalleeParamX11264 = SSA_SNeX76[2];
        const fooCalleeParamX11265 = SSA_SNeX76[3];
        const fooCalleeParamX11266 = SSA_SNeX76[1];
        const SSA_fooReturnArgX143 = LP$cloneX2$clone($, fooCalleeParamX11261, $, fooCalleeParamX11262, fooCalleeParamX11263, fooCalleeParamX11264, fooCalleeParamX11265, $A, fooCalleeParamX11266);
        return SSA_fooReturnArgX143;
      }
      const fooIfTestX13144 = fooSwitchCaseToStartX352 <= 8;
      if (fooIfTestX13144) {
        PNeX191 = SSA_SNeX76[4];
        const NNeX135 = SSA_SNeX76[3];
        const CNeX70 = SSA_SNeX76[2];
        kNeX164 = SSA_SNeX76[1];
        const fooBinBothRhsX4241 = typeof CNeX70;
        const fooIfTestX13184 = "number" == fooBinBothRhsX4241;
        if (fooIfTestX13184) {
          const fooBinBothRhsX4244 = typeof NNeX135;
          const fooIfTestX13187 = "number" == fooBinBothRhsX4244;
          if (fooIfTestX13187) {
            let fooReturnArgX5600 = undefined;
            const fooIfTestX13188 = 0 === NNeX135;
            if (fooIfTestX13188) {
              fooReturnArgX5600 = function (nCeX402) {
                const fooCalleeParamX11267 = SSA_bNeX94;
                const fooArrElementX3215 = SSA_xNeX108;
                const fooArrElementX3217 = SP(kNeX164, zAe, nCeX402);
                const fooCalleeParamX11268 = [4, fooArrElementX3215, fooArrElementX3217];
                const fooCalleeParamX11269 = PNeX191;
                const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, fooCalleeParamX11269);
                return fooReturnArgX5601;
              };
            } else {
              fooReturnArgX5600 = function (nCeX403, rCeX214) {
                const fooCalleeParamX11270 = SSA_bNeX94;
                const fooArrElementX3219 = SSA_xNeX108;
                const fooArrElementX3221 = SP(kNeX164, nCeX403, rCeX214);
                const fooCalleeParamX11271 = [4, fooArrElementX3219, fooArrElementX3221];
                const fooCalleeParamX11272 = PNeX191;
                const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, fooCalleeParamX11272);
                return fooReturnArgX5602;
              };
            }
            return fooReturnArgX5600;
          }
          vNeX134 = NNeX135[1];
          const fooReturnArgX5599 = function (nCeX404) {
            const fooCalleeParamX11273 = SSA_bNeX94;
            const fooArrElementX3223 = SSA_xNeX108;
            const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
            const fooCalleeParamX11274 = [4, fooArrElementX3223, fooArrElementX3225];
            const fooCalleeParamX11275 = PNeX191;
            const fooReturnArgX5603 = RP$cloneX5(fooCalleeParamX11273, $, fooCalleeParamX11274, fooCalleeParamX11275);
            return fooReturnArgX5603;
          };
          return fooReturnArgX5599;
        }
        const fooBinBothRhsX4242 = CNeX70[0];
        const fooIfTestX13185 = 0 === fooBinBothRhsX4242;
        if (fooIfTestX13185) {
          wNeX70 = CNeX70[2];
          LNeX86 = CNeX70[1];
          const fooBinBothRhsX4245 = typeof NNeX135;
          const fooIfTestX13189 = "number" == fooBinBothRhsX4245;
          if (fooIfTestX13189) {
            let fooReturnArgX5605 = undefined;
            const fooIfTestX13190 = 0 === NNeX135;
            if (fooIfTestX13190) {
              fooReturnArgX5605 = function (nCeX405) {
                const fooCalleeParamX11276 = SSA_bNeX94;
                const fooArrElementX3227 = SSA_xNeX108;
                const fooCalleeParamX11277 = LNeX86;
                const fooCalleeParamX11278 = wNeX70;
                const fooCalleeParamX11279 = SP(kNeX164, zAe, nCeX405);
                const fooArrElementX3229 = UA(fooCalleeParamX11277, fooCalleeParamX11278, fooCalleeParamX11279);
                const fooCalleeParamX11280 = [4, fooArrElementX3227, fooArrElementX3229];
                const fooCalleeParamX11281 = PNeX191;
                const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, fooCalleeParamX11281);
                return fooReturnArgX5606;
              };
            } else {
              fooReturnArgX5605 = function (nCeX406, rCeX215) {
                const fooCalleeParamX11282 = SSA_bNeX94;
                const fooArrElementX3232 = SSA_xNeX108;
                const fooCalleeParamX11283 = LNeX86;
                const fooCalleeParamX11284 = wNeX70;
                const fooCalleeParamX11285 = SP(kNeX164, nCeX406, rCeX215);
                const fooArrElementX3234 = UA(fooCalleeParamX11283, fooCalleeParamX11284, fooCalleeParamX11285);
                const fooCalleeParamX11286 = [4, fooArrElementX3232, fooArrElementX3234];
                const fooCalleeParamX11287 = PNeX191;
                const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, fooCalleeParamX11287);
                return fooReturnArgX5607;
              };
            }
            return fooReturnArgX5605;
          }
          INeX72 = NNeX135[1];
          const fooReturnArgX5604 = function (nCeX407) {
            const fooCalleeParamX11288 = SSA_bNeX94;
            const fooArrElementX3237 = SSA_xNeX108;
            const fooCalleeParamX11289 = LNeX86;
            const fooCalleeParamX11290 = wNeX70;
            const fooCalleeParamX11291 = SP(kNeX164, INeX72, nCeX407);
            const fooArrElementX3239 = UA(fooCalleeParamX11289, fooCalleeParamX11290, fooCalleeParamX11291);
            const fooCalleeParamX11292 = [4, fooArrElementX3237, fooArrElementX3239];
            const fooCalleeParamX11293 = PNeX191;
            const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, fooCalleeParamX11293);
            return fooReturnArgX5608;
          };
          return fooReturnArgX5604;
        }
        jNeX68 = CNeX70[1];
        const fooBinBothRhsX4243 = typeof NNeX135;
        const fooIfTestX13186 = "number" == fooBinBothRhsX4243;
        if (fooIfTestX13186) {
          let fooReturnArgX5609 = undefined;
          const fooIfTestX13191 = 0 === NNeX135;
          if (fooIfTestX13191) {
            fooReturnArgX5609 = function (nCeX408, rCeX216) {
              const fooCalleeParamX11294 = SSA_bNeX94;
              const fooArrElementX3242 = SSA_xNeX108;
              const fooCalleeParamX11295 = jNeX68;
              const fooCalleeParamX11296 = SP(kNeX164, zAe, rCeX216);
              const fooArrElementX3244 = UA(fooCalleeParamX11295, nCeX408, fooCalleeParamX11296);
              const fooCalleeParamX11297 = [4, fooArrElementX3242, fooArrElementX3244];
              const fooCalleeParamX11298 = PNeX191;
              const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, fooCalleeParamX11298);
              return fooReturnArgX5610;
            };
          } else {
            fooReturnArgX5609 = function (nCeX409, rCeX217, sCeX129) {
              const fooCalleeParamX11299 = SSA_bNeX94;
              const fooArrElementX3247 = SSA_xNeX108;
              const fooCalleeParamX11300 = jNeX68;
              const fooCalleeParamX11301 = SP(kNeX164, rCeX217, sCeX129);
              const fooArrElementX3249 = UA(fooCalleeParamX11300, nCeX409, fooCalleeParamX11301);
              const fooCalleeParamX11302 = [4, fooArrElementX3247, fooArrElementX3249];
              const fooCalleeParamX11303 = PNeX191;
              const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, fooCalleeParamX11303);
              return fooReturnArgX5611;
            };
          }
          return fooReturnArgX5609;
        }
        RNeX72 = NNeX135[1];
        const fooReturnArgX5598 = function (nCeX410, rCeX218) {
          const fooCalleeParamX11304 = SSA_bNeX94;
          const fooArrElementX3252 = SSA_xNeX108;
          const fooCalleeParamX11305 = jNeX68;
          const fooCalleeParamX11306 = SP(kNeX164, RNeX72, rCeX218);
          const fooArrElementX3254 = UA(fooCalleeParamX11305, nCeX410, fooCalleeParamX11306);
          const fooCalleeParamX11307 = [4, fooArrElementX3252, fooArrElementX3254];
          const fooCalleeParamX11308 = PNeX191;
          const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, fooCalleeParamX11308);
          return fooReturnArgX5612;
        };
        return fooReturnArgX5598;
      }
      const fooIfTestX13145 = fooSwitchCaseToStartX352 <= 9;
      if (fooIfTestX13145) {
        DNeX65 = SSA_SNeX76[1];
        const fooReturnArgX5613 = function (nCeX411) {
          var rCeX219;
          if (nCeX411) {
            rCeX219 = TU;
          } else {
            rCeX219 = _U;
          }
          const fooCalleeParamX11309 = SSA_bNeX94;
          const fooCalleeParamX11310 = [4, SSA_xNeX108, rCeX219];
          const fooCalleeParamX11311 = DNeX65;
          const fooReturnArgX5614 = RP$cloneX5(fooCalleeParamX11309, $, fooCalleeParamX11310, fooCalleeParamX11311);
          return fooReturnArgX5614;
        };
        return fooReturnArgX5613;
      }
      const fooIfTestX13146 = fooSwitchCaseToStartX352 <= 10;
      if (fooIfTestX13146) {
        SSA_xNeX108 = [7, SSA_xNeX108];
        SSA_SNeX76 = SSA_SNeX76[1];
        continue;
      }
      const fooIfTestX13147 = fooSwitchCaseToStartX352 <= 11;
      if (fooIfTestX13147) {
        const fooArrElementX3257 = SSA_xNeX108;
        const fooArrElementX3259 = SSA_SNeX76[1];
        SSA_xNeX108 = [2, fooArrElementX3257, fooArrElementX3259];
        SSA_SNeX76 = SSA_SNeX76[2];
        continue;
      }
      const fooIfTestX13148 = fooSwitchCaseToStartX352 <= 12;
      if (fooIfTestX13148) {
        const fooArrElementX3262 = SSA_xNeX108;
        const fooArrElementX3264 = SSA_SNeX76[1];
        SSA_xNeX108 = [3, fooArrElementX3262, fooArrElementX3264];
        SSA_SNeX76 = SSA_SNeX76[2];
        continue;
      }
      const fooIfTestX13149 = fooSwitchCaseToStartX352 <= 13;
      if (fooIfTestX13149) {
        MNeX63 = SSA_SNeX76[3];
        const ONeX61 = SSA_SNeX76[2];
        const YNeX58 = Q_$clone($);
        _A(YNeX58, ONeX61);
        FNeX55 = TA(YNeX58);
        const fooReturnArgX5615 = function () {
          const fooCalleeParamX11312 = SSA_bNeX94;
          const fooCalleeParamX11313 = [4, SSA_xNeX108, FNeX55];
          const fooCalleeParamX11314 = MNeX63;
          const fooReturnArgX5616 = RP$cloneX5(fooCalleeParamX11312, $, fooCalleeParamX11313, fooCalleeParamX11314);
          return fooReturnArgX5616;
        };
        return fooReturnArgX5615;
      }
      const fooIfTestX13150 = fooSwitchCaseToStartX352 <= 14;
      if (fooIfTestX13150) {
        VNeX53 = SSA_SNeX76[3];
        BNeX51 = SSA_SNeX76[2];
        const fooReturnArgX5617 = function (nCeX412) {
          const rCeX220 = nCeX412[1];
          const fooCalleeParamX11315 = PA(BNeX51);
          const fooCalleeParamX11316 = WE(fooCalleeParamX11315);
          const sCeX130 = YA(rCeX220, fooCalleeParamX11316);
          const fooUnaryArgX395 = sCeX130[2];
          const fooBinBothRhsX4246 = typeof fooUnaryArgX395;
          const fooIfTestX13192 = "number" == fooBinBothRhsX4246;
          if (fooIfTestX13192) {
            const fooCalleeParamX11317 = SSA_bNeX94;
            const fooCalleeParamX11318 = SSA_xNeX108;
            const fooCalleeParamX11319 = sCeX130[1];
            const fooCalleeParamX11320 = VNeX53;
            const fooCalleeParamX11321 = ZE(fooCalleeParamX11319, fooCalleeParamX11320);
            const fooReturnArgX5618 = RP$cloneX5(fooCalleeParamX11317, $, fooCalleeParamX11318, fooCalleeParamX11321);
            return fooReturnArgX5618;
          }
          throw JAe;
        };
        return fooReturnArgX5617;
      }
      const fooIfTestX13151 = fooSwitchCaseToStartX352 <= 15;
      if (fooIfTestX13151) {
        UNeX80 = SSA_SNeX76[1];
        const fooReturnArgX5619 = function (nCeX413, rCeX221) {
          const fooCalleeParamX11322 = SSA_bNeX94;
          const fooArrElementX3267 = SSA_xNeX108;
          const fooArrElementX3269 = function (sCeX131) {
            const fooReturnArgX5621 = YE(nCeX413, sCeX131, rCeX221);
            return fooReturnArgX5621;
          };
          const fooCalleeParamX11323 = [6, fooArrElementX3267, fooArrElementX3269];
          const fooCalleeParamX11324 = UNeX80;
          const fooReturnArgX5620 = RP$cloneX5(fooCalleeParamX11322, $, fooCalleeParamX11323, fooCalleeParamX11324);
          return fooReturnArgX5620;
        };
        return fooReturnArgX5619;
      }
      const fooIfTestX13152 = fooSwitchCaseToStartX352 <= 16;
      if (fooIfTestX13152) {
        XNeX77 = SSA_SNeX76[1];
        const fooReturnArgX5622 = function (nCeX414) {
          const fooCalleeParamX11325 = SSA_bNeX94;
          const fooCalleeParamX11326 = [6, SSA_xNeX108, nCeX414];
          const fooCalleeParamX11327 = XNeX77;
          const fooReturnArgX5623 = RP$cloneX5(fooCalleeParamX11325, $, fooCalleeParamX11326, fooCalleeParamX11327);
          return fooReturnArgX5623;
        };
        return fooReturnArgX5622;
      }
      const fooIfTestX13153 = fooSwitchCaseToStartX352 <= 17;
      if (fooIfTestX13153) {
        const fooArrElementX3272 = SSA_xNeX108;
        const fooArrElementX3274 = SSA_SNeX76[1];
        SSA_xNeX108 = [0, fooArrElementX3272, fooArrElementX3274];
        SSA_SNeX76 = SSA_SNeX76[2];
        continue;
      }
      const fooIfTestX13154 = fooSwitchCaseToStartX352 <= 18;
      if (fooIfTestX13154) {
        const WNeX66 = SSA_SNeX76[1];
        const fooBinBothRhsX4247 = WNeX66[0];
        const fooIfTestX13193 = 0 === fooBinBothRhsX4247;
        if (fooIfTestX13193) {
          const qNeX60 = SSA_SNeX76[2];
          const fooAssignRhsPropX413 = WNeX66[1];
          const GNeX69 = fooAssignRhsPropX413[1];
          const fooCallCalleeX105 = function (nCeX415, rCeX222, sCeX132) {
            const fooReturnArgX5624 = function (iCeX154, oCeX143) {
              const fooArrElementX3277 = [0, oCeX143];
              const fooCalleeParamX11328 = [1, nCeX415, fooArrElementX3277];
              const fooReturnArgX5625 = RP(rCeX222, iCeX154, fooCalleeParamX11328, sCeX132);
              return fooReturnArgX5625;
            };
            return fooReturnArgX5624;
          };
          SSA_bNeX94 = fooCallCalleeX105(SSA_xNeX108, SSA_bNeX94, qNeX60);
          SSA_xNeX108 = 0;
          SSA_SNeX76 = GNeX69;
          continue;
        }
        const zNeX57 = SSA_SNeX76[2];
        const fooAssignRhsPropX412 = WNeX66[1];
        const JNeX53 = fooAssignRhsPropX412[1];
        const fooCallCalleeX102 = function (nCeX416, rCeX223, sCeX133) {
          const fooReturnArgX5626 = function (iCeX155, oCeX144) {
            const fooArrElementX3279 = [1, oCeX144];
            const fooCalleeParamX11329 = [1, nCeX416, fooArrElementX3279];
            const fooReturnArgX5627 = RP(rCeX223, iCeX155, fooCalleeParamX11329, sCeX133);
            return fooReturnArgX5627;
          };
          return fooReturnArgX5626;
        };
        SSA_bNeX94 = fooCallCalleeX102(SSA_xNeX108, SSA_bNeX94, zNeX57);
        SSA_xNeX108 = 0;
        SSA_SNeX76 = JNeX53;
        continue;
      }
      const fooIfTestX13155 = fooSwitchCaseToStartX352 <= 19;
      if (fooIfTestX13155) {
        const fooThrowArgX300 = [0, WB, Rq];
        throw fooThrowArgX300;
      }
      const fooIfTestX13156 = fooSwitchCaseToStartX352 <= 20;
      if (fooIfTestX13156) {
        HNeX48 = SSA_SNeX76[3];
        ZNeX45 = [8, SSA_xNeX108, Mq];
        const fooReturnArgX5628 = function () {
          const fooReturnArgX5629 = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
          return fooReturnArgX5629;
        };
        return fooReturnArgX5628;
      }
      const fooIfTestX13157 = fooSwitchCaseToStartX352 <= 21;
      if (fooIfTestX13157) {
        KNeX38 = SSA_SNeX76[2];
        const fooReturnArgX5630 = function (nCeX417) {
          const fooCalleeParamX11330 = SSA_bNeX94;
          const fooArrElementX3282 = SSA_xNeX108;
          const fooArrElementX3284 = $yX2(Iq, nCeX417);
          const fooCalleeParamX11331 = [4, fooArrElementX3282, fooArrElementX3284];
          const fooCalleeParamX11332 = KNeX38;
          const fooReturnArgX5631 = RP$cloneX5(fooCalleeParamX11330, $, fooCalleeParamX11331, fooCalleeParamX11332);
          return fooReturnArgX5631;
        };
        return fooReturnArgX5630;
      }
      const fooIfTestX13158 = fooSwitchCaseToStartX352 <= 22;
      if (fooIfTestX13158) {
        QNeX102 = SSA_SNeX76[1];
        const fooReturnArgX5632 = function (nCeX418) {
          const fooCalleeParamX11333 = SSA_bNeX94;
          const fooCalleeParamX11334 = [5, SSA_xNeX108, nCeX418];
          const fooCalleeParamX11335 = QNeX102;
          const fooReturnArgX5633 = RP$cloneX5(fooCalleeParamX11333, $, fooCalleeParamX11334, fooCalleeParamX11335);
          return fooReturnArgX5633;
        };
        return fooReturnArgX5632;
      }
      const fooIfTestX13159 = fooSwitchCaseToStartX352 <= 23;
      if (fooIfTestX13159) {
        const $NeX101 = SSA_SNeX76[2];
        const eCeX71 = SSA_SNeX76[1];
        const fooBinBothRhsX4248 = typeof eCeX71;
        const fooIfTestX13194 = "number" == fooBinBothRhsX4248;
        if (fooIfTestX13194) {
          let fooSwitchCaseToStartX353 = 4;
          const fooIfTestX13195 = 0 === eCeX71;
          if (fooIfTestX13195) {
            fooSwitchCaseToStartX353 = 0;
          } else {
            const fooIfTestX13201 = 1 === eCeX71;
            if (fooIfTestX13201) {
              fooSwitchCaseToStartX353 = 1;
            } else {
              const fooIfTestX13202 = 2 === eCeX71;
              if (fooIfTestX13202) {
                fooSwitchCaseToStartX353 = 2;
              } else {
                const fooIfTestX13203 = 3 === eCeX71;
                if (fooIfTestX13203) {
                  fooSwitchCaseToStartX353 = 3;
                }
              }
            }
          }
          const fooIfTestX13196 = fooSwitchCaseToStartX353 <= 0;
          if (fooIfTestX13196) {
            const fooCalleeParamX11336 = SSA_bNeX94;
            const fooCalleeParamX11337 = SSA_xNeX108;
            const SSA_fooReturnArgX144 = PP$cloneX3$clone($, fooCalleeParamX11336, $, fooCalleeParamX11337, $NeX101);
            return SSA_fooReturnArgX144;
          }
          const fooIfTestX13197 = fooSwitchCaseToStartX353 <= 1;
          if (fooIfTestX13197) {
            const fooCalleeParamX11338 = SSA_bNeX94;
            const fooCalleeParamX11339 = SSA_xNeX108;
            const SSA_fooReturnArgX145 = PP$cloneX3$clone($, fooCalleeParamX11338, $, fooCalleeParamX11339, $NeX101);
            return SSA_fooReturnArgX145;
          }
          const fooIfTestX13198 = fooSwitchCaseToStartX353 <= 2;
          if (fooIfTestX13198) {
            const fooCalleeParamX11340 = SSA_bNeX94;
            const fooCalleeParamX11341 = SSA_xNeX108;
            const SSA_fooReturnArgX146 = PP$cloneX3$clone($, fooCalleeParamX11340, $, fooCalleeParamX11341, $NeX101);
            return SSA_fooReturnArgX146;
          }
          const fooIfTestX13199 = fooSwitchCaseToStartX353 <= 3;
          if (fooIfTestX13199) {
            const fooThrowArgX301 = [0, WB, Oq];
            throw fooThrowArgX301;
          }
          const fooIfTestX13200 = fooSwitchCaseToStartX353 <= 4;
          if (fooIfTestX13200) {
            const fooCalleeParamX11342 = SSA_bNeX94;
            const fooCalleeParamX11343 = SSA_xNeX108;
            const SSA_fooReturnArgX147 = PP$cloneX3$clone($, fooCalleeParamX11342, $, fooCalleeParamX11343, $NeX101);
            return SSA_fooReturnArgX147;
          }
        } else {
          const fooSwitchTestX187 = eCeX71[0];
          let fooSwitchCaseToStartX354 = 10;
          const fooIfTestX13204 = 0 === fooSwitchTestX187;
          if (fooIfTestX13204) {
            fooSwitchCaseToStartX354 = 0;
          } else {
            const fooIfTestX13216 = 1 === fooSwitchTestX187;
            if (fooIfTestX13216) {
              fooSwitchCaseToStartX354 = 1;
            } else {
              const fooIfTestX13217 = 2 === fooSwitchTestX187;
              if (fooIfTestX13217) {
                fooSwitchCaseToStartX354 = 2;
              } else {
                const fooIfTestX13218 = 3 === fooSwitchTestX187;
                if (fooIfTestX13218) {
                  fooSwitchCaseToStartX354 = 3;
                } else {
                  const fooIfTestX13219 = 4 === fooSwitchTestX187;
                  if (fooIfTestX13219) {
                    fooSwitchCaseToStartX354 = 4;
                  } else {
                    const fooIfTestX13220 = 5 === fooSwitchTestX187;
                    if (fooIfTestX13220) {
                      fooSwitchCaseToStartX354 = 5;
                    } else {
                      const fooIfTestX13221 = 6 === fooSwitchTestX187;
                      if (fooIfTestX13221) {
                        fooSwitchCaseToStartX354 = 6;
                      } else {
                        const fooIfTestX13222 = 7 === fooSwitchTestX187;
                        if (fooIfTestX13222) {
                          fooSwitchCaseToStartX354 = 7;
                        } else {
                          const fooIfTestX13223 = 8 === fooSwitchTestX187;
                          if (fooIfTestX13223) {
                            fooSwitchCaseToStartX354 = 8;
                          } else {
                            const fooIfTestX13224 = 9 === fooSwitchTestX187;
                            if (fooIfTestX13224) {
                              fooSwitchCaseToStartX354 = 9;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          const fooIfTestX13205 = fooSwitchCaseToStartX354 <= 0;
          if (fooIfTestX13205) {
            const fooCalleeParamX11344 = SSA_bNeX94;
            const fooCalleeParamX11345 = SSA_xNeX108;
            const SSA_fooReturnArgX148 = PP$cloneX3$clone($, fooCalleeParamX11344, $, fooCalleeParamX11345, $NeX101);
            return SSA_fooReturnArgX148;
          }
          const fooIfTestX13206 = fooSwitchCaseToStartX354 <= 1;
          if (fooIfTestX13206) {
            const fooCalleeParamX11346 = SSA_bNeX94;
            const fooCalleeParamX11347 = SSA_xNeX108;
            const SSA_fooReturnArgX149 = PP$cloneX3$clone($, fooCalleeParamX11346, $, fooCalleeParamX11347, $NeX101);
            return SSA_fooReturnArgX149;
          }
          const fooIfTestX13207 = fooSwitchCaseToStartX354 <= 2;
          if (fooIfTestX13207) {
            const fooCalleeParamX11348 = SSA_bNeX94;
            const fooCalleeParamX11349 = SSA_xNeX108;
            const SSA_fooReturnArgX150 = PP$cloneX3$clone($, fooCalleeParamX11348, $, fooCalleeParamX11349, $NeX101);
            return SSA_fooReturnArgX150;
          }
          const fooIfTestX13208 = fooSwitchCaseToStartX354 <= 3;
          if (fooIfTestX13208) {
            const fooCalleeParamX11350 = SSA_bNeX94;
            const fooCalleeParamX11351 = SSA_xNeX108;
            const SSA_fooReturnArgX151 = PP$cloneX3$clone($, fooCalleeParamX11350, $, fooCalleeParamX11351, $NeX101);
            return SSA_fooReturnArgX151;
          }
          const fooIfTestX13209 = fooSwitchCaseToStartX354 <= 4;
          if (fooIfTestX13209) {
            const fooCalleeParamX11352 = SSA_bNeX94;
            const fooCalleeParamX11353 = SSA_xNeX108;
            const SSA_fooReturnArgX152 = PP$cloneX3$clone($, fooCalleeParamX11352, $, fooCalleeParamX11353, $NeX101);
            return SSA_fooReturnArgX152;
          }
          const fooIfTestX13210 = fooSwitchCaseToStartX354 <= 5;
          if (fooIfTestX13210) {
            const fooCalleeParamX11354 = SSA_bNeX94;
            const fooCalleeParamX11355 = SSA_xNeX108;
            const SSA_fooReturnArgX153 = PP$cloneX3$clone($, fooCalleeParamX11354, $, fooCalleeParamX11355, $NeX101);
            return SSA_fooReturnArgX153;
          }
          const fooIfTestX13211 = fooSwitchCaseToStartX354 <= 6;
          if (fooIfTestX13211) {
            const fooCalleeParamX11356 = SSA_bNeX94;
            const fooCalleeParamX11357 = SSA_xNeX108;
            const SSA_fooReturnArgX154 = PP$cloneX3$clone($, fooCalleeParamX11356, $, fooCalleeParamX11357, $NeX101);
            return SSA_fooReturnArgX154;
          }
          const fooIfTestX13212 = fooSwitchCaseToStartX354 <= 7;
          if (fooIfTestX13212) {
            const fooCalleeParamX11358 = SSA_bNeX94;
            const fooCalleeParamX11359 = SSA_xNeX108;
            const SSA_fooReturnArgX155 = PP$cloneX3$clone($, fooCalleeParamX11358, $, fooCalleeParamX11359, $NeX101);
            return SSA_fooReturnArgX155;
          }
          const fooIfTestX13213 = fooSwitchCaseToStartX354 <= 8;
          if (fooIfTestX13213) {
            const fooCalleeParamX11360 = SSA_bNeX94;
            const fooCalleeParamX11361 = SSA_xNeX108;
            const fooCalleeParamX11362 = eCeX71[2];
            const SSA_fooReturnArgX156 = _P$cloneX4$clone($, fooCalleeParamX11360, $, fooCalleeParamX11361, fooCalleeParamX11362, $NeX101);
            return SSA_fooReturnArgX156;
          }
          const fooIfTestX13214 = fooSwitchCaseToStartX354 <= 9;
          if (fooIfTestX13214) {
            const fooCalleeParamX11363 = SSA_bNeX94;
            const fooCalleeParamX11364 = SSA_xNeX108;
            const SSA_fooReturnArgX157 = PP$cloneX3$clone($, fooCalleeParamX11363, $, fooCalleeParamX11364, $NeX101);
            return SSA_fooReturnArgX157;
          }
          const fooIfTestX13215 = fooSwitchCaseToStartX354 <= 10;
          if (fooIfTestX13215) {
            const fooCalleeParamX11365 = SSA_bNeX94;
            const fooCalleeParamX11366 = SSA_xNeX108;
            const SSA_fooReturnArgX158 = PP$cloneX3$clone($, fooCalleeParamX11365, $, fooCalleeParamX11366, $NeX101);
            return SSA_fooReturnArgX158;
          }
        }
      }
      const fooIfTestX13160 = fooSwitchCaseToStartX352 <= 24;
      if (fooIfTestX13160) {
        const tCeX65 = SSA_SNeX76[3];
        const aCeX130 = SSA_SNeX76[1];
        const fooCalleeParamX11367 = SSA_bNeX94;
        const fooCalleeParamX11368 = SSA_xNeX108;
        const fooCalleeParamX11369 = SSA_SNeX76[2];
        const fooCalleeParamX11370 = OE$clone(fooCalleeParamX11369, $);
        const SSA_fooReturnArgX159 = IP$cloneX3$cloneX1($, fooCalleeParamX11367, $, fooCalleeParamX11368, tCeX65, aCeX130, fooCalleeParamX11370);
        return SSA_fooReturnArgX159;
      }
    }
  }
$(TP$cloneX2$cloneX1);
`````


## Settled


`````js filename=intro
const fooCalleeParamX11238 /*:(unknown)=>unknown*/ = function $pcompiled($$0) {
  const nCeX401 /*:unknown*/ = $$0;
  debugger;
  return nCeX401;
};
const TP$cloneX2$cloneX1 /*:(unused, unknown, unused, unknown, unknown)=>unknown*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const mNeX765 /*:unknown*/ = $$1;
  const gNeX352 /*:unknown*/ = $$3;
  const yNeX272 /*:unknown*/ = $$4;
  debugger;
  const tmpClusterSSA_fooReturnArgX5609$1 /*:(unknown, unknown, unknown)=>unknown*/ = function ($$0, $$1, $$2) {
    const nCeX409 /*:unknown*/ = $$0;
    const rCeX217 /*:unknown*/ = $$1;
    const sCeX129 /*:unknown*/ = $$2;
    debugger;
    const fooCalleeParamX11299 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3247 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11300 /*:unknown*/ = jNeX68;
    const fooCalleeParamX11301 /*:unknown*/ = SP(kNeX164, rCeX217, sCeX129);
    const fooArrElementX3249 /*:unknown*/ = UA(fooCalleeParamX11300, nCeX409, fooCalleeParamX11301);
    const fooCalleeParamX11302 /*:array*/ /*truthy*/ = [4, fooArrElementX3247, fooArrElementX3249];
    const fooReturnArgX5611 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, PNeX191);
    return fooReturnArgX5611;
  };
  const tmpClusterSSA_fooReturnArgX5609 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX408 /*:unknown*/ = $$0;
    const rCeX216 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11294 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3242 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11295 /*:unknown*/ = jNeX68;
    const fooCalleeParamX11296 /*:unknown*/ = SP(kNeX164, zAe, rCeX216);
    const fooArrElementX3244 /*:unknown*/ = UA(fooCalleeParamX11295, nCeX408, fooCalleeParamX11296);
    const fooCalleeParamX11297 /*:array*/ /*truthy*/ = [4, fooArrElementX3242, fooArrElementX3244];
    const fooReturnArgX5610 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, PNeX191);
    return fooReturnArgX5610;
  };
  const tmpClusterSSA_fooReturnArgX5605$1 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX406 /*:unknown*/ = $$0;
    const rCeX215 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11282 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3232 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11283 /*:unknown*/ = LNeX86;
    const fooCalleeParamX11284 /*:unknown*/ = wNeX70;
    const fooCalleeParamX11285 /*:unknown*/ = SP(kNeX164, nCeX406, rCeX215);
    const fooArrElementX3234 /*:unknown*/ = UA(fooCalleeParamX11283, fooCalleeParamX11284, fooCalleeParamX11285);
    const fooCalleeParamX11286 /*:array*/ /*truthy*/ = [4, fooArrElementX3232, fooArrElementX3234];
    const fooReturnArgX5607 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, PNeX191);
    return fooReturnArgX5607;
  };
  const tmpClusterSSA_fooReturnArgX5605 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX405 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11276 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3227 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11277 /*:unknown*/ = LNeX86;
    const fooCalleeParamX11278 /*:unknown*/ = wNeX70;
    const fooCalleeParamX11279 /*:unknown*/ = SP(kNeX164, zAe, nCeX405);
    const fooArrElementX3229 /*:unknown*/ = UA(fooCalleeParamX11277, fooCalleeParamX11278, fooCalleeParamX11279);
    const fooCalleeParamX11280 /*:array*/ /*truthy*/ = [4, fooArrElementX3227, fooArrElementX3229];
    const fooReturnArgX5606 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, PNeX191);
    return fooReturnArgX5606;
  };
  const tmpClusterSSA_fooReturnArgX5600$1 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX403 /*:unknown*/ = $$0;
    const rCeX214 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11270 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3219 /*:unknown*/ = SSA_xNeX108;
    const fooArrElementX3221 /*:unknown*/ = SP(kNeX164, nCeX403, rCeX214);
    const fooCalleeParamX11271 /*:array*/ /*truthy*/ = [4, fooArrElementX3219, fooArrElementX3221];
    const fooReturnArgX5602 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, PNeX191);
    return fooReturnArgX5602;
  };
  const tmpClusterSSA_fooReturnArgX5600 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX402 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11267 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3215 /*:unknown*/ = SSA_xNeX108;
    const fooArrElementX3217 /*:unknown*/ = SP(kNeX164, zAe, nCeX402);
    const fooCalleeParamX11268 /*:array*/ /*truthy*/ = [4, fooArrElementX3215, fooArrElementX3217];
    const fooReturnArgX5601 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, PNeX191);
    return fooReturnArgX5601;
  };
  const fooReturnArgX5632 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX418 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11333 /*:unknown*/ = SSA_bNeX94;
    const fooCalleeParamX11334 /*:array*/ /*truthy*/ = [5, SSA_xNeX108, nCeX418];
    const fooReturnArgX5633 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11333, $, fooCalleeParamX11334, QNeX102);
    return fooReturnArgX5633;
  };
  const fooReturnArgX5630 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX417 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11330 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3282 /*:unknown*/ = SSA_xNeX108;
    const fooArrElementX3284 /*:unknown*/ = $yX2(Iq, nCeX417);
    const fooCalleeParamX11331 /*:array*/ /*truthy*/ = [4, fooArrElementX3282, fooArrElementX3284];
    const fooReturnArgX5631 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11330, $, fooCalleeParamX11331, KNeX38);
    return fooReturnArgX5631;
  };
  const fooReturnArgX5628 /*:()=>unknown*/ = function () {
    debugger;
    const fooReturnArgX5629 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
    return fooReturnArgX5629;
  };
  const fooReturnArgX5622 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX414 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11325 /*:unknown*/ = SSA_bNeX94;
    const fooCalleeParamX11326 /*:array*/ /*truthy*/ = [6, SSA_xNeX108, nCeX414];
    const fooReturnArgX5623 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11325, $, fooCalleeParamX11326, XNeX77);
    return fooReturnArgX5623;
  };
  const fooReturnArgX5619 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX413 /*:unknown*/ = $$0;
    const rCeX221 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11322 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3267 /*:unknown*/ = SSA_xNeX108;
    const fooArrElementX3269 /*:(unknown)=>unknown*/ = function ($$0) {
      const sCeX131 /*:unknown*/ = $$0;
      debugger;
      const fooReturnArgX5621 /*:unknown*/ = YE(nCeX413, sCeX131, rCeX221);
      return fooReturnArgX5621;
    };
    const fooCalleeParamX11323 /*:array*/ /*truthy*/ = [6, fooArrElementX3267, fooArrElementX3269];
    const fooReturnArgX5620 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11322, $, fooCalleeParamX11323, UNeX80);
    return fooReturnArgX5620;
  };
  let BNeX51 /*:unknown*/ = undefined;
  const fooReturnArgX5617 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX412 /*:unknown*/ = $$0;
    debugger;
    const rCeX220 /*:unknown*/ = nCeX412[1];
    const fooCalleeParamX11315 /*:unknown*/ = PA(BNeX51);
    const fooCalleeParamX11316 /*:unknown*/ = WE(fooCalleeParamX11315);
    const sCeX130 /*:unknown*/ = YA(rCeX220, fooCalleeParamX11316);
    const fooUnaryArgX395 /*:unknown*/ = sCeX130[2];
    const fooBinBothRhsX4246 /*:string*/ /*truthy*/ = typeof fooUnaryArgX395;
    const fooIfTestX13192 /*:boolean*/ = `number` == fooBinBothRhsX4246;
    if (fooIfTestX13192) {
      const fooCalleeParamX11317 /*:unknown*/ = SSA_bNeX94;
      const fooCalleeParamX11318 /*:unknown*/ = SSA_xNeX108;
      const fooCalleeParamX11319 /*:unknown*/ = sCeX130[1];
      const fooCalleeParamX11321 /*:unknown*/ = ZE(fooCalleeParamX11319, VNeX53);
      const fooReturnArgX5618 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11317, $, fooCalleeParamX11318, fooCalleeParamX11321);
      return fooReturnArgX5618;
    } else {
      throw JAe;
    }
  };
  const fooReturnArgX5615 /*:()=>unknown*/ = function () {
    debugger;
    const fooCalleeParamX11312 /*:unknown*/ = SSA_bNeX94;
    const fooCalleeParamX11313 /*:array*/ /*truthy*/ = [4, SSA_xNeX108, FNeX55];
    const fooReturnArgX5616 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11312, $, fooCalleeParamX11313, MNeX63);
    return fooReturnArgX5616;
  };
  let DNeX65 /*:unknown*/ = undefined;
  const fooReturnArgX5613 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX411 /*:unknown*/ = $$0;
    debugger;
    let rCeX219 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (nCeX411) {
      rCeX219 = TU;
    } else {
      rCeX219 = _U;
    }
    const fooCalleeParamX11309 /*:unknown*/ = SSA_bNeX94;
    const fooCalleeParamX11310 /*:array*/ /*truthy*/ = [4, SSA_xNeX108, rCeX219];
    const fooReturnArgX5614 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11309, $, fooCalleeParamX11310, DNeX65);
    return fooReturnArgX5614;
  };
  const fooReturnArgX5598 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX410 /*:unknown*/ = $$0;
    const rCeX218 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11304 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3252 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11305 /*:unknown*/ = jNeX68;
    const fooCalleeParamX11306 /*:unknown*/ = SP(kNeX164, RNeX72, rCeX218);
    const fooArrElementX3254 /*:unknown*/ = UA(fooCalleeParamX11305, nCeX410, fooCalleeParamX11306);
    const fooCalleeParamX11307 /*:array*/ /*truthy*/ = [4, fooArrElementX3252, fooArrElementX3254];
    const fooReturnArgX5612 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, PNeX191);
    return fooReturnArgX5612;
  };
  const fooReturnArgX5604 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX407 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11288 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3237 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11289 /*:unknown*/ = LNeX86;
    const fooCalleeParamX11290 /*:unknown*/ = wNeX70;
    const fooCalleeParamX11291 /*:unknown*/ = SP(kNeX164, INeX72, nCeX407);
    const fooArrElementX3239 /*:unknown*/ = UA(fooCalleeParamX11289, fooCalleeParamX11290, fooCalleeParamX11291);
    const fooCalleeParamX11292 /*:array*/ /*truthy*/ = [4, fooArrElementX3237, fooArrElementX3239];
    const fooReturnArgX5608 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, PNeX191);
    return fooReturnArgX5608;
  };
  const fooReturnArgX5599 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX404 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11273 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3223 /*:unknown*/ = SSA_xNeX108;
    const fooArrElementX3225 /*:unknown*/ = SP(kNeX164, vNeX134, nCeX404);
    const fooCalleeParamX11274 /*:array*/ /*truthy*/ = [4, fooArrElementX3223, fooArrElementX3225];
    const fooReturnArgX5603 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11273, $, fooCalleeParamX11274, PNeX191);
    return fooReturnArgX5603;
  };
  const fooReturnArgX5596 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX400 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11231 /*:unknown*/ = SSA_bNeX94;
    const fooArrElementX3211 /*:unknown*/ = SSA_xNeX108;
    const fooCalleeParamX11232 /*:unknown*/ = XT(nCeX400);
    const fooArrElementX3213 /*:unknown*/ = __(fooCalleeParamX11232, Jq);
    const fooCalleeParamX11234 /*:array*/ /*truthy*/ = [4, fooArrElementX3211, fooArrElementX3213];
    const fooReturnArgX5597 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, TNeX211);
    return fooReturnArgX5597;
  };
  let ENeX311 /*:unknown*/ = undefined;
  let FNeX55 /*:unknown*/ = undefined;
  let HNeX48 /*:unknown*/ = undefined;
  let INeX72 /*:unknown*/ = undefined;
  let KNeX38 /*:unknown*/ = undefined;
  let LNeX86 /*:unknown*/ = undefined;
  let MNeX63 /*:unknown*/ = undefined;
  let PNeX191 /*:unknown*/ = undefined;
  let QNeX102 /*:unknown*/ = undefined;
  let RNeX72 /*:unknown*/ = undefined;
  let SSA_bNeX94 /*:unknown*/ = mNeX765;
  let SSA_xNeX108 /*:unknown*/ = gNeX352;
  let TNeX211 /*:unknown*/ = undefined;
  let UNeX80 /*:unknown*/ = undefined;
  let VNeX53 /*:unknown*/ = undefined;
  let XNeX77 /*:unknown*/ = undefined;
  let ZNeX45 /*:unknown*/ = undefined;
  const fooReturnArgX5594 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX399 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11228 /*:unknown*/ = SSA_bNeX94;
    const fooCalleeParamX11229 /*:array*/ /*truthy*/ = [5, SSA_xNeX108, nCeX399];
    const fooReturnArgX5595 /*:unknown*/ = RP$cloneX5(fooCalleeParamX11228, $, fooCalleeParamX11229, ENeX311);
    return fooReturnArgX5595;
  };
  let jNeX68 /*:unknown*/ = undefined;
  let kNeX164 /*:unknown*/ = undefined;
  let vNeX134 /*:unknown*/ = undefined;
  let wNeX70 /*:unknown*/ = undefined;
  let SSA_SNeX76 /*:unknown*/ = yNeX272;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const fooBinBothRhsX4240 /*:string*/ /*truthy*/ = typeof SSA_SNeX76;
    const fooIfTestX13134 /*:boolean*/ = `number` == fooBinBothRhsX4240;
    if (fooIfTestX13134) {
      const fooReturnArgX5593 /*:unknown*/ = YE$cloneX5(SSA_bNeX94, $, SSA_xNeX108);
      return fooReturnArgX5593;
    } else {
      const fooSwitchTestX186 /*:unknown*/ = SSA_SNeX76[0];
      let fooSwitchCaseToStartX352 /*:number*/ = 24;
      const fooIfTestX13135 /*:boolean*/ = 0 === fooSwitchTestX186;
      if (fooIfTestX13135) {
        fooSwitchCaseToStartX352 = 0;
      } else {
        const fooIfTestX13161 /*:boolean*/ = 1 === fooSwitchTestX186;
        if (fooIfTestX13161) {
          fooSwitchCaseToStartX352 = 1;
        } else {
          const fooIfTestX13162 /*:boolean*/ = 2 === fooSwitchTestX186;
          if (fooIfTestX13162) {
            fooSwitchCaseToStartX352 = 2;
          } else {
            const fooIfTestX13163 /*:boolean*/ = 3 === fooSwitchTestX186;
            if (fooIfTestX13163) {
              fooSwitchCaseToStartX352 = 3;
            } else {
              const fooIfTestX13164 /*:boolean*/ = 4 === fooSwitchTestX186;
              if (fooIfTestX13164) {
                fooSwitchCaseToStartX352 = 4;
              } else {
                const fooIfTestX13165 /*:boolean*/ = 5 === fooSwitchTestX186;
                if (fooIfTestX13165) {
                  fooSwitchCaseToStartX352 = 5;
                } else {
                  const fooIfTestX13166 /*:boolean*/ = 6 === fooSwitchTestX186;
                  if (fooIfTestX13166) {
                    fooSwitchCaseToStartX352 = 6;
                  } else {
                    const fooIfTestX13167 /*:boolean*/ = 7 === fooSwitchTestX186;
                    if (fooIfTestX13167) {
                      fooSwitchCaseToStartX352 = 7;
                    } else {
                      const fooIfTestX13168 /*:boolean*/ = 8 === fooSwitchTestX186;
                      if (fooIfTestX13168) {
                        fooSwitchCaseToStartX352 = 8;
                      } else {
                        const fooIfTestX13169 /*:boolean*/ = 9 === fooSwitchTestX186;
                        if (fooIfTestX13169) {
                          fooSwitchCaseToStartX352 = 9;
                        } else {
                          const fooIfTestX13170 /*:boolean*/ = 10 === fooSwitchTestX186;
                          if (fooIfTestX13170) {
                            fooSwitchCaseToStartX352 = 10;
                          } else {
                            const fooIfTestX13171 /*:boolean*/ = 11 === fooSwitchTestX186;
                            if (fooIfTestX13171) {
                              fooSwitchCaseToStartX352 = 11;
                            } else {
                              const fooIfTestX13172 /*:boolean*/ = 12 === fooSwitchTestX186;
                              if (fooIfTestX13172) {
                                fooSwitchCaseToStartX352 = 12;
                              } else {
                                const fooIfTestX13173 /*:boolean*/ = 13 === fooSwitchTestX186;
                                if (fooIfTestX13173) {
                                  fooSwitchCaseToStartX352 = 13;
                                } else {
                                  const fooIfTestX13174 /*:boolean*/ = 14 === fooSwitchTestX186;
                                  if (fooIfTestX13174) {
                                    fooSwitchCaseToStartX352 = 14;
                                  } else {
                                    const fooIfTestX13175 /*:boolean*/ = 15 === fooSwitchTestX186;
                                    if (fooIfTestX13175) {
                                      fooSwitchCaseToStartX352 = 15;
                                    } else {
                                      const fooIfTestX13176 /*:boolean*/ = 16 === fooSwitchTestX186;
                                      if (fooIfTestX13176) {
                                        fooSwitchCaseToStartX352 = 16;
                                      } else {
                                        const fooIfTestX13177 /*:boolean*/ = 17 === fooSwitchTestX186;
                                        if (fooIfTestX13177) {
                                          fooSwitchCaseToStartX352 = 17;
                                        } else {
                                          const fooIfTestX13178 /*:boolean*/ = 18 === fooSwitchTestX186;
                                          if (fooIfTestX13178) {
                                            fooSwitchCaseToStartX352 = 18;
                                          } else {
                                            const fooIfTestX13179 /*:boolean*/ = 19 === fooSwitchTestX186;
                                            if (fooIfTestX13179) {
                                              fooSwitchCaseToStartX352 = 19;
                                            } else {
                                              const fooIfTestX13180 /*:boolean*/ = 20 === fooSwitchTestX186;
                                              if (fooIfTestX13180) {
                                                fooSwitchCaseToStartX352 = 20;
                                              } else {
                                                const fooIfTestX13181 /*:boolean*/ = 21 === fooSwitchTestX186;
                                                if (fooIfTestX13181) {
                                                  fooSwitchCaseToStartX352 = 21;
                                                } else {
                                                  const fooIfTestX13182 /*:boolean*/ = 22 === fooSwitchTestX186;
                                                  if (fooIfTestX13182) {
                                                    fooSwitchCaseToStartX352 = 22;
                                                  } else {
                                                    const fooIfTestX13183 /*:boolean*/ = 23 === fooSwitchTestX186;
                                                    if (fooIfTestX13183) {
                                                      fooSwitchCaseToStartX352 = 23;
                                                    } else {
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      const fooIfTestX13136 /*:boolean*/ = fooSwitchCaseToStartX352 <= 0;
      if (fooIfTestX13136) {
        ENeX311 = SSA_SNeX76[1];
        return fooReturnArgX5594;
      } else {
        const fooIfTestX13137 /*:boolean*/ = fooSwitchCaseToStartX352 <= 1;
        if (fooIfTestX13137) {
          TNeX211 = SSA_SNeX76[1];
          return fooReturnArgX5596;
        } else {
          const fooIfTestX13138 /*:boolean*/ = fooSwitchCaseToStartX352 <= 2;
          if (fooIfTestX13138) {
            const _NeX233 /*:unknown*/ = SSA_SNeX76[2];
            const ANeX206 /*:unknown*/ = SSA_SNeX76[1];
            const SSA_fooReturnArgX138 /*:unknown*/ = NP$cloneX2$clone(
              $,
              SSA_bNeX94,
              $,
              SSA_xNeX108,
              _NeX233,
              ANeX206,
              fooCalleeParamX11238,
            );
            return SSA_fooReturnArgX138;
          } else {
            const fooIfTestX13139 /*:boolean*/ = fooSwitchCaseToStartX352 <= 3;
            if (fooIfTestX13139) {
              const fooCalleeParamX11241 /*:unknown*/ = SSA_SNeX76[2];
              const fooCalleeParamX11242 /*:unknown*/ = SSA_SNeX76[1];
              const SSA_fooReturnArgX139 /*:unknown*/ = NP$cloneX2$clone(
                $,
                SSA_bNeX94,
                $,
                SSA_xNeX108,
                fooCalleeParamX11241,
                fooCalleeParamX11242,
                WA,
              );
              return SSA_fooReturnArgX139;
            } else {
              const fooIfTestX13140 /*:boolean*/ = fooSwitchCaseToStartX352 <= 4;
              if (fooIfTestX13140) {
                const fooCalleeParamX11245 /*:unknown*/ = SSA_SNeX76[4];
                const fooCalleeParamX11246 /*:unknown*/ = SSA_SNeX76[2];
                const fooCalleeParamX11247 /*:unknown*/ = SSA_SNeX76[3];
                const fooCalleeParamX11248 /*:unknown*/ = SSA_SNeX76[1];
                const SSA_fooReturnArgX140 /*:unknown*/ = LP$cloneX2$clone(
                  $,
                  SSA_bNeX94,
                  $,
                  SSA_xNeX108,
                  fooCalleeParamX11245,
                  fooCalleeParamX11246,
                  fooCalleeParamX11247,
                  ZA,
                  fooCalleeParamX11248,
                );
                return SSA_fooReturnArgX140;
              } else {
                const fooIfTestX13141 /*:boolean*/ = fooSwitchCaseToStartX352 <= 5;
                if (fooIfTestX13141) {
                  const fooCalleeParamX11251 /*:unknown*/ = SSA_SNeX76[4];
                  const fooCalleeParamX11252 /*:unknown*/ = SSA_SNeX76[2];
                  const fooCalleeParamX11253 /*:unknown*/ = SSA_SNeX76[3];
                  const fooCalleeParamX11254 /*:unknown*/ = SSA_SNeX76[1];
                  const SSA_fooReturnArgX141 /*:unknown*/ = LP$cloneX2$clone(
                    $,
                    SSA_bNeX94,
                    $,
                    SSA_xNeX108,
                    fooCalleeParamX11251,
                    fooCalleeParamX11252,
                    fooCalleeParamX11253,
                    KA,
                    fooCalleeParamX11254,
                  );
                  return SSA_fooReturnArgX141;
                } else {
                  const fooIfTestX13142 /*:boolean*/ = fooSwitchCaseToStartX352 <= 6;
                  if (fooIfTestX13142) {
                    const fooCalleeParamX11257 /*:unknown*/ = SSA_SNeX76[4];
                    const fooCalleeParamX11258 /*:unknown*/ = SSA_SNeX76[2];
                    const fooCalleeParamX11259 /*:unknown*/ = SSA_SNeX76[3];
                    const fooCalleeParamX11260 /*:unknown*/ = SSA_SNeX76[1];
                    const SSA_fooReturnArgX142 /*:unknown*/ = LP$cloneX2$clone(
                      $,
                      SSA_bNeX94,
                      $,
                      SSA_xNeX108,
                      fooCalleeParamX11257,
                      fooCalleeParamX11258,
                      fooCalleeParamX11259,
                      QA,
                      fooCalleeParamX11260,
                    );
                    return SSA_fooReturnArgX142;
                  } else {
                    const fooIfTestX13143 /*:boolean*/ = fooSwitchCaseToStartX352 <= 7;
                    if (fooIfTestX13143) {
                      const fooCalleeParamX11263 /*:unknown*/ = SSA_SNeX76[4];
                      const fooCalleeParamX11264 /*:unknown*/ = SSA_SNeX76[2];
                      const fooCalleeParamX11265 /*:unknown*/ = SSA_SNeX76[3];
                      const fooCalleeParamX11266 /*:unknown*/ = SSA_SNeX76[1];
                      const SSA_fooReturnArgX143 /*:unknown*/ = LP$cloneX2$clone(
                        $,
                        SSA_bNeX94,
                        $,
                        SSA_xNeX108,
                        fooCalleeParamX11263,
                        fooCalleeParamX11264,
                        fooCalleeParamX11265,
                        $A,
                        fooCalleeParamX11266,
                      );
                      return SSA_fooReturnArgX143;
                    } else {
                      const fooIfTestX13144 /*:boolean*/ = fooSwitchCaseToStartX352 <= 8;
                      if (fooIfTestX13144) {
                        PNeX191 = SSA_SNeX76[4];
                        const NNeX135 /*:unknown*/ = SSA_SNeX76[3];
                        const CNeX70 /*:unknown*/ = SSA_SNeX76[2];
                        kNeX164 = SSA_SNeX76[1];
                        const fooBinBothRhsX4241 /*:string*/ /*truthy*/ = typeof CNeX70;
                        const fooIfTestX13184 /*:boolean*/ = `number` == fooBinBothRhsX4241;
                        if (fooIfTestX13184) {
                          const fooBinBothRhsX4244 /*:string*/ /*truthy*/ = typeof NNeX135;
                          const fooIfTestX13187 /*:boolean*/ = `number` == fooBinBothRhsX4244;
                          if (fooIfTestX13187) {
                            const fooIfTestX13188 /*:boolean*/ = 0 === NNeX135;
                            if (fooIfTestX13188) {
                              return tmpClusterSSA_fooReturnArgX5600;
                            } else {
                              return tmpClusterSSA_fooReturnArgX5600$1;
                            }
                          } else {
                            vNeX134 = NNeX135[1];
                            return fooReturnArgX5599;
                          }
                        } else {
                          const fooBinBothRhsX4242 /*:unknown*/ = CNeX70[0];
                          const fooIfTestX13185 /*:boolean*/ = 0 === fooBinBothRhsX4242;
                          if (fooIfTestX13185) {
                            wNeX70 = CNeX70[2];
                            LNeX86 = CNeX70[1];
                            const fooBinBothRhsX4245 /*:string*/ /*truthy*/ = typeof NNeX135;
                            const fooIfTestX13189 /*:boolean*/ = `number` == fooBinBothRhsX4245;
                            if (fooIfTestX13189) {
                              const fooIfTestX13190 /*:boolean*/ = 0 === NNeX135;
                              if (fooIfTestX13190) {
                                return tmpClusterSSA_fooReturnArgX5605;
                              } else {
                                return tmpClusterSSA_fooReturnArgX5605$1;
                              }
                            } else {
                              INeX72 = NNeX135[1];
                              return fooReturnArgX5604;
                            }
                          } else {
                            jNeX68 = CNeX70[1];
                            const fooBinBothRhsX4243 /*:string*/ /*truthy*/ = typeof NNeX135;
                            const fooIfTestX13186 /*:boolean*/ = `number` == fooBinBothRhsX4243;
                            if (fooIfTestX13186) {
                              const fooIfTestX13191 /*:boolean*/ = 0 === NNeX135;
                              if (fooIfTestX13191) {
                                return tmpClusterSSA_fooReturnArgX5609;
                              } else {
                                return tmpClusterSSA_fooReturnArgX5609$1;
                              }
                            } else {
                              RNeX72 = NNeX135[1];
                              return fooReturnArgX5598;
                            }
                          }
                        }
                      } else {
                        const fooIfTestX13145 /*:boolean*/ = fooSwitchCaseToStartX352 <= 9;
                        if (fooIfTestX13145) {
                          DNeX65 = SSA_SNeX76[1];
                          return fooReturnArgX5613;
                        } else {
                          const fooIfTestX13146 /*:boolean*/ = fooSwitchCaseToStartX352 <= 10;
                          if (fooIfTestX13146) {
                            SSA_xNeX108 = [7, SSA_xNeX108];
                            SSA_SNeX76 = SSA_SNeX76[1];
                          } else {
                            const fooIfTestX13147 /*:boolean*/ = fooSwitchCaseToStartX352 <= 11;
                            if (fooIfTestX13147) {
                              const fooArrElementX3259 /*:unknown*/ = SSA_SNeX76[1];
                              SSA_xNeX108 = [2, SSA_xNeX108, fooArrElementX3259];
                              SSA_SNeX76 = SSA_SNeX76[2];
                            } else {
                              const fooIfTestX13148 /*:boolean*/ = fooSwitchCaseToStartX352 <= 12;
                              if (fooIfTestX13148) {
                                const fooArrElementX3264 /*:unknown*/ = SSA_SNeX76[1];
                                SSA_xNeX108 = [3, SSA_xNeX108, fooArrElementX3264];
                                SSA_SNeX76 = SSA_SNeX76[2];
                              } else {
                                const fooIfTestX13149 /*:boolean*/ = fooSwitchCaseToStartX352 <= 13;
                                if (fooIfTestX13149) {
                                  MNeX63 = SSA_SNeX76[3];
                                  const ONeX61 /*:unknown*/ = SSA_SNeX76[2];
                                  const YNeX58 /*:unknown*/ = Q_$clone($);
                                  _A(YNeX58, ONeX61);
                                  FNeX55 = TA(YNeX58);
                                  return fooReturnArgX5615;
                                } else {
                                  const fooIfTestX13150 /*:boolean*/ = fooSwitchCaseToStartX352 <= 14;
                                  if (fooIfTestX13150) {
                                    VNeX53 = SSA_SNeX76[3];
                                    BNeX51 = SSA_SNeX76[2];
                                    return fooReturnArgX5617;
                                  } else {
                                    const fooIfTestX13151 /*:boolean*/ = fooSwitchCaseToStartX352 <= 15;
                                    if (fooIfTestX13151) {
                                      UNeX80 = SSA_SNeX76[1];
                                      return fooReturnArgX5619;
                                    } else {
                                      const fooIfTestX13152 /*:boolean*/ = fooSwitchCaseToStartX352 <= 16;
                                      if (fooIfTestX13152) {
                                        XNeX77 = SSA_SNeX76[1];
                                        return fooReturnArgX5622;
                                      } else {
                                        const fooIfTestX13153 /*:boolean*/ = fooSwitchCaseToStartX352 <= 17;
                                        if (fooIfTestX13153) {
                                          const fooArrElementX3274 /*:unknown*/ = SSA_SNeX76[1];
                                          SSA_xNeX108 = [0, SSA_xNeX108, fooArrElementX3274];
                                          SSA_SNeX76 = SSA_SNeX76[2];
                                        } else {
                                          const fooIfTestX13154 /*:boolean*/ = fooSwitchCaseToStartX352 <= 18;
                                          if (fooIfTestX13154) {
                                            const WNeX66 /*:unknown*/ = SSA_SNeX76[1];
                                            const fooBinBothRhsX4247 /*:unknown*/ = WNeX66[0];
                                            const qNeX60 /*:unknown*/ = SSA_SNeX76[2];
                                            const fooAssignRhsPropX413 /*:unknown*/ = WNeX66[1];
                                            const GNeX69 /*:unknown*/ = fooAssignRhsPropX413[1];
                                            const nCeX415 /*:unknown*/ = SSA_xNeX108;
                                            const rCeX222 /*:unknown*/ = SSA_bNeX94;
                                            const fooIfTestX13193 /*:boolean*/ = 0 === fooBinBothRhsX4247;
                                            if (fooIfTestX13193) {
                                              SSA_bNeX94 = function ($$0, $$1) {
                                                const iCeX154 /*:unknown*/ = $$0;
                                                const oCeX143 /*:unknown*/ = $$1;
                                                debugger;
                                                const fooArrElementX3277 /*:array*/ /*truthy*/ = [0, oCeX143];
                                                const fooCalleeParamX11328 /*:array*/ /*truthy*/ = [1, nCeX415, fooArrElementX3277];
                                                const fooReturnArgX5625 /*:unknown*/ = RP(rCeX222, iCeX154, fooCalleeParamX11328, qNeX60);
                                                return fooReturnArgX5625;
                                              };
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            } else {
                                              SSA_bNeX94 = function ($$0, $$1) {
                                                const iCeX155 /*:unknown*/ = $$0;
                                                const oCeX144 /*:unknown*/ = $$1;
                                                debugger;
                                                const fooArrElementX3279 /*:array*/ /*truthy*/ = [1, oCeX144];
                                                const fooCalleeParamX11329 /*:array*/ /*truthy*/ = [1, nCeX415, fooArrElementX3279];
                                                const fooReturnArgX5627 /*:unknown*/ = RP(rCeX222, iCeX155, fooCalleeParamX11329, qNeX60);
                                                return fooReturnArgX5627;
                                              };
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            }
                                          } else {
                                            const fooIfTestX13155 /*:boolean*/ = fooSwitchCaseToStartX352 <= 19;
                                            if (fooIfTestX13155) {
                                              const fooThrowArgX300 /*:array*/ /*truthy*/ = [0, WB, Rq];
                                              throw fooThrowArgX300;
                                            } else {
                                              const fooIfTestX13156 /*:boolean*/ = fooSwitchCaseToStartX352 <= 20;
                                              if (fooIfTestX13156) {
                                                HNeX48 = SSA_SNeX76[3];
                                                ZNeX45 = [8, SSA_xNeX108, Mq];
                                                return fooReturnArgX5628;
                                              } else {
                                                const fooIfTestX13157 /*:boolean*/ = fooSwitchCaseToStartX352 <= 21;
                                                if (fooIfTestX13157) {
                                                  KNeX38 = SSA_SNeX76[2];
                                                  return fooReturnArgX5630;
                                                } else {
                                                  const fooIfTestX13158 /*:boolean*/ = fooSwitchCaseToStartX352 <= 22;
                                                  if (fooIfTestX13158) {
                                                    QNeX102 = SSA_SNeX76[1];
                                                    return fooReturnArgX5632;
                                                  } else {
                                                    const fooIfTestX13159 /*:boolean*/ = fooSwitchCaseToStartX352 <= 23;
                                                    if (fooIfTestX13159) {
                                                      const $NeX101 /*:unknown*/ = SSA_SNeX76[2];
                                                      const eCeX71 /*:unknown*/ = SSA_SNeX76[1];
                                                      const fooBinBothRhsX4248 /*:string*/ /*truthy*/ = typeof eCeX71;
                                                      const fooIfTestX13194 /*:boolean*/ = `number` == fooBinBothRhsX4248;
                                                      if (fooIfTestX13194) {
                                                        let fooSwitchCaseToStartX353 /*:number*/ = 4;
                                                        const fooIfTestX13195 /*:boolean*/ = 0 === eCeX71;
                                                        if (fooIfTestX13195) {
                                                          fooSwitchCaseToStartX353 = 0;
                                                        } else {
                                                          const fooIfTestX13201 /*:boolean*/ = 1 === eCeX71;
                                                          if (fooIfTestX13201) {
                                                            fooSwitchCaseToStartX353 = 1;
                                                          } else {
                                                            const fooIfTestX13202 /*:boolean*/ = 2 === eCeX71;
                                                            if (fooIfTestX13202) {
                                                              fooSwitchCaseToStartX353 = 2;
                                                            } else {
                                                              const fooIfTestX13203 /*:boolean*/ = 3 === eCeX71;
                                                              if (fooIfTestX13203) {
                                                                fooSwitchCaseToStartX353 = 3;
                                                              } else {
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const fooIfTestX13196 /*:boolean*/ = fooSwitchCaseToStartX353 <= 0;
                                                        if (fooIfTestX13196) {
                                                          const SSA_fooReturnArgX144 /*:unknown*/ = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX144;
                                                        } else {
                                                          const fooIfTestX13197 /*:boolean*/ = fooSwitchCaseToStartX353 <= 1;
                                                          if (fooIfTestX13197) {
                                                            const SSA_fooReturnArgX145 /*:unknown*/ = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX145;
                                                          } else {
                                                            const fooIfTestX13198 /*:boolean*/ = fooSwitchCaseToStartX353 <= 2;
                                                            if (fooIfTestX13198) {
                                                              const SSA_fooReturnArgX146 /*:unknown*/ = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX146;
                                                            } else {
                                                              const fooIfTestX13199 /*:boolean*/ = fooSwitchCaseToStartX353 <= 3;
                                                              if (fooIfTestX13199) {
                                                                const fooThrowArgX301 /*:array*/ /*truthy*/ = [0, WB, Oq];
                                                                throw fooThrowArgX301;
                                                              } else {
                                                                const SSA_fooReturnArgX147 /*:unknown*/ = PP$cloneX3$clone(
                                                                  $,
                                                                  SSA_bNeX94,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX147;
                                                              }
                                                            }
                                                          }
                                                        }
                                                      } else {
                                                        const fooSwitchTestX187 /*:unknown*/ = eCeX71[0];
                                                        let fooSwitchCaseToStartX354 /*:number*/ = 10;
                                                        const fooIfTestX13204 /*:boolean*/ = 0 === fooSwitchTestX187;
                                                        if (fooIfTestX13204) {
                                                          fooSwitchCaseToStartX354 = 0;
                                                        } else {
                                                          const fooIfTestX13216 /*:boolean*/ = 1 === fooSwitchTestX187;
                                                          if (fooIfTestX13216) {
                                                            fooSwitchCaseToStartX354 = 1;
                                                          } else {
                                                            const fooIfTestX13217 /*:boolean*/ = 2 === fooSwitchTestX187;
                                                            if (fooIfTestX13217) {
                                                              fooSwitchCaseToStartX354 = 2;
                                                            } else {
                                                              const fooIfTestX13218 /*:boolean*/ = 3 === fooSwitchTestX187;
                                                              if (fooIfTestX13218) {
                                                                fooSwitchCaseToStartX354 = 3;
                                                              } else {
                                                                const fooIfTestX13219 /*:boolean*/ = 4 === fooSwitchTestX187;
                                                                if (fooIfTestX13219) {
                                                                  fooSwitchCaseToStartX354 = 4;
                                                                } else {
                                                                  const fooIfTestX13220 /*:boolean*/ = 5 === fooSwitchTestX187;
                                                                  if (fooIfTestX13220) {
                                                                    fooSwitchCaseToStartX354 = 5;
                                                                  } else {
                                                                    const fooIfTestX13221 /*:boolean*/ = 6 === fooSwitchTestX187;
                                                                    if (fooIfTestX13221) {
                                                                      fooSwitchCaseToStartX354 = 6;
                                                                    } else {
                                                                      const fooIfTestX13222 /*:boolean*/ = 7 === fooSwitchTestX187;
                                                                      if (fooIfTestX13222) {
                                                                        fooSwitchCaseToStartX354 = 7;
                                                                      } else {
                                                                        const fooIfTestX13223 /*:boolean*/ = 8 === fooSwitchTestX187;
                                                                        if (fooIfTestX13223) {
                                                                          fooSwitchCaseToStartX354 = 8;
                                                                        } else {
                                                                          const fooIfTestX13224 /*:boolean*/ = 9 === fooSwitchTestX187;
                                                                          if (fooIfTestX13224) {
                                                                            fooSwitchCaseToStartX354 = 9;
                                                                          } else {
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const fooIfTestX13205 /*:boolean*/ = fooSwitchCaseToStartX354 <= 0;
                                                        if (fooIfTestX13205) {
                                                          const SSA_fooReturnArgX148 /*:unknown*/ = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX148;
                                                        } else {
                                                          const fooIfTestX13206 /*:boolean*/ = fooSwitchCaseToStartX354 <= 1;
                                                          if (fooIfTestX13206) {
                                                            const SSA_fooReturnArgX149 /*:unknown*/ = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX149;
                                                          } else {
                                                            const fooIfTestX13207 /*:boolean*/ = fooSwitchCaseToStartX354 <= 2;
                                                            if (fooIfTestX13207) {
                                                              const SSA_fooReturnArgX150 /*:unknown*/ = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX150;
                                                            } else {
                                                              const fooIfTestX13208 /*:boolean*/ = fooSwitchCaseToStartX354 <= 3;
                                                              if (fooIfTestX13208) {
                                                                const SSA_fooReturnArgX151 /*:unknown*/ = PP$cloneX3$clone(
                                                                  $,
                                                                  SSA_bNeX94,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX151;
                                                              } else {
                                                                const fooIfTestX13209 /*:boolean*/ = fooSwitchCaseToStartX354 <= 4;
                                                                if (fooIfTestX13209) {
                                                                  const SSA_fooReturnArgX152 /*:unknown*/ = PP$cloneX3$clone(
                                                                    $,
                                                                    SSA_bNeX94,
                                                                    $,
                                                                    SSA_xNeX108,
                                                                    $NeX101,
                                                                  );
                                                                  return SSA_fooReturnArgX152;
                                                                } else {
                                                                  const fooIfTestX13210 /*:boolean*/ = fooSwitchCaseToStartX354 <= 5;
                                                                  if (fooIfTestX13210) {
                                                                    const SSA_fooReturnArgX153 /*:unknown*/ = PP$cloneX3$clone(
                                                                      $,
                                                                      SSA_bNeX94,
                                                                      $,
                                                                      SSA_xNeX108,
                                                                      $NeX101,
                                                                    );
                                                                    return SSA_fooReturnArgX153;
                                                                  } else {
                                                                    const fooIfTestX13211 /*:boolean*/ = fooSwitchCaseToStartX354 <= 6;
                                                                    if (fooIfTestX13211) {
                                                                      const SSA_fooReturnArgX154 /*:unknown*/ = PP$cloneX3$clone(
                                                                        $,
                                                                        SSA_bNeX94,
                                                                        $,
                                                                        SSA_xNeX108,
                                                                        $NeX101,
                                                                      );
                                                                      return SSA_fooReturnArgX154;
                                                                    } else {
                                                                      const fooIfTestX13212 /*:boolean*/ = fooSwitchCaseToStartX354 <= 7;
                                                                      if (fooIfTestX13212) {
                                                                        const SSA_fooReturnArgX155 /*:unknown*/ = PP$cloneX3$clone(
                                                                          $,
                                                                          SSA_bNeX94,
                                                                          $,
                                                                          SSA_xNeX108,
                                                                          $NeX101,
                                                                        );
                                                                        return SSA_fooReturnArgX155;
                                                                      } else {
                                                                        const fooIfTestX13213 /*:boolean*/ = fooSwitchCaseToStartX354 <= 8;
                                                                        if (fooIfTestX13213) {
                                                                          const fooCalleeParamX11362 /*:unknown*/ = eCeX71[2];
                                                                          const SSA_fooReturnArgX156 /*:unknown*/ = _P$cloneX4$clone(
                                                                            $,
                                                                            SSA_bNeX94,
                                                                            $,
                                                                            SSA_xNeX108,
                                                                            fooCalleeParamX11362,
                                                                            $NeX101,
                                                                          );
                                                                          return SSA_fooReturnArgX156;
                                                                        } else {
                                                                          const SSA_fooReturnArgX157 /*:unknown*/ = PP$cloneX3$clone(
                                                                            $,
                                                                            SSA_bNeX94,
                                                                            $,
                                                                            SSA_xNeX108,
                                                                            $NeX101,
                                                                          );
                                                                          return SSA_fooReturnArgX157;
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    } else {
                                                      const tCeX65 /*:unknown*/ = SSA_SNeX76[3];
                                                      const aCeX130 /*:unknown*/ = SSA_SNeX76[1];
                                                      const fooCalleeParamX11369 /*:unknown*/ = SSA_SNeX76[2];
                                                      const fooCalleeParamX11370 /*:unknown*/ = OE$clone(fooCalleeParamX11369, $);
                                                      const SSA_fooReturnArgX159 /*:unknown*/ = IP$cloneX3$cloneX1(
                                                        $,
                                                        SSA_bNeX94,
                                                        $,
                                                        SSA_xNeX108,
                                                        tCeX65,
                                                        aCeX130,
                                                        fooCalleeParamX11370,
                                                      );
                                                      return SSA_fooReturnArgX159;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return undefined;
};
$(TP$cloneX2$cloneX1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const fooCalleeParamX11238 = function $pcompiled(nCeX401) {
  return nCeX401;
};
$(function ($$0, mNeX765, $$2, gNeX352, yNeX272) {
  const tmpClusterSSA_fooReturnArgX5609$1 = function (nCeX409, rCeX217, sCeX129) {
    const fooCalleeParamX11299 = SSA_bNeX94;
    const fooArrElementX3247 = SSA_xNeX108;
    const fooArrElementX3249 = UA(jNeX68, nCeX409, SP(kNeX164, rCeX217, sCeX129));
    const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, [4, fooArrElementX3247, fooArrElementX3249], PNeX191);
    return fooReturnArgX5611;
  };
  const tmpClusterSSA_fooReturnArgX5609 = function (nCeX408, rCeX216) {
    const fooCalleeParamX11294 = SSA_bNeX94;
    const fooArrElementX3242 = SSA_xNeX108;
    const fooArrElementX3244 = UA(jNeX68, nCeX408, SP(kNeX164, zAe, rCeX216));
    const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, [4, fooArrElementX3242, fooArrElementX3244], PNeX191);
    return fooReturnArgX5610;
  };
  const tmpClusterSSA_fooReturnArgX5605$1 = function (nCeX406, rCeX215) {
    const fooCalleeParamX11282 = SSA_bNeX94;
    const fooArrElementX3232 = SSA_xNeX108;
    const fooArrElementX3234 = UA(LNeX86, wNeX70, SP(kNeX164, nCeX406, rCeX215));
    const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, [4, fooArrElementX3232, fooArrElementX3234], PNeX191);
    return fooReturnArgX5607;
  };
  const tmpClusterSSA_fooReturnArgX5605 = function (nCeX405) {
    const fooCalleeParamX11276 = SSA_bNeX94;
    const fooArrElementX3227 = SSA_xNeX108;
    const fooArrElementX3229 = UA(LNeX86, wNeX70, SP(kNeX164, zAe, nCeX405));
    const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, [4, fooArrElementX3227, fooArrElementX3229], PNeX191);
    return fooReturnArgX5606;
  };
  const tmpClusterSSA_fooReturnArgX5600$1 = function (nCeX403, rCeX214) {
    const fooCalleeParamX11270 = SSA_bNeX94;
    const fooArrElementX3219 = SSA_xNeX108;
    const fooArrElementX3221 = SP(kNeX164, nCeX403, rCeX214);
    const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, [4, fooArrElementX3219, fooArrElementX3221], PNeX191);
    return fooReturnArgX5602;
  };
  const tmpClusterSSA_fooReturnArgX5600 = function (nCeX402) {
    const fooCalleeParamX11267 = SSA_bNeX94;
    const fooArrElementX3215 = SSA_xNeX108;
    const fooArrElementX3217 = SP(kNeX164, zAe, nCeX402);
    const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, [4, fooArrElementX3215, fooArrElementX3217], PNeX191);
    return fooReturnArgX5601;
  };
  const fooReturnArgX5632 = function (nCeX418) {
    const fooReturnArgX5633 = RP$cloneX5(SSA_bNeX94, $, [5, SSA_xNeX108, nCeX418], QNeX102);
    return fooReturnArgX5633;
  };
  const fooReturnArgX5630 = function (nCeX417) {
    const fooCalleeParamX11330 = SSA_bNeX94;
    const fooArrElementX3282 = SSA_xNeX108;
    const fooArrElementX3284 = $yX2(Iq, nCeX417);
    const fooReturnArgX5631 = RP$cloneX5(fooCalleeParamX11330, $, [4, fooArrElementX3282, fooArrElementX3284], KNeX38);
    return fooReturnArgX5631;
  };
  const fooReturnArgX5628 = function () {
    const fooReturnArgX5629 = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
    return fooReturnArgX5629;
  };
  const fooReturnArgX5622 = function (nCeX414) {
    const fooReturnArgX5623 = RP$cloneX5(SSA_bNeX94, $, [6, SSA_xNeX108, nCeX414], XNeX77);
    return fooReturnArgX5623;
  };
  const fooReturnArgX5619 = function (nCeX413, rCeX221) {
    const fooCalleeParamX11322 = SSA_bNeX94;
    const fooArrElementX3267 = SSA_xNeX108;
    const fooArrElementX3269 = function (sCeX131) {
      const fooReturnArgX5621 = YE(nCeX413, sCeX131, rCeX221);
      return fooReturnArgX5621;
    };
    const fooReturnArgX5620 = RP$cloneX5(fooCalleeParamX11322, $, [6, fooArrElementX3267, fooArrElementX3269], UNeX80);
    return fooReturnArgX5620;
  };
  let BNeX51 = undefined;
  const fooReturnArgX5617 = function (nCeX412) {
    const sCeX130 = YA(nCeX412[1], WE(PA(BNeX51)));
    const fooUnaryArgX395 = sCeX130[2];
    const fooBinBothRhsX4246 = typeof fooUnaryArgX395;
    if (`number` == fooBinBothRhsX4246) {
      const fooReturnArgX5618 = RP$cloneX5(SSA_bNeX94, $, SSA_xNeX108, ZE(sCeX130[1], VNeX53));
      return fooReturnArgX5618;
    } else {
      throw JAe;
    }
  };
  const fooReturnArgX5615 = function () {
    const fooReturnArgX5616 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, FNeX55], MNeX63);
    return fooReturnArgX5616;
  };
  let DNeX65 = undefined;
  const fooReturnArgX5613 = function (nCeX411) {
    let rCeX219 = undefined;
    if (nCeX411) {
      rCeX219 = TU;
    } else {
      rCeX219 = _U;
    }
    const fooReturnArgX5614 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, rCeX219], DNeX65);
    return fooReturnArgX5614;
  };
  const fooReturnArgX5598 = function (nCeX410, rCeX218) {
    const fooCalleeParamX11304 = SSA_bNeX94;
    const fooArrElementX3252 = SSA_xNeX108;
    const fooArrElementX3254 = UA(jNeX68, nCeX410, SP(kNeX164, RNeX72, rCeX218));
    const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, [4, fooArrElementX3252, fooArrElementX3254], PNeX191);
    return fooReturnArgX5612;
  };
  const fooReturnArgX5604 = function (nCeX407) {
    const fooCalleeParamX11288 = SSA_bNeX94;
    const fooArrElementX3237 = SSA_xNeX108;
    const fooArrElementX3239 = UA(LNeX86, wNeX70, SP(kNeX164, INeX72, nCeX407));
    const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, [4, fooArrElementX3237, fooArrElementX3239], PNeX191);
    return fooReturnArgX5608;
  };
  const fooReturnArgX5599 = function (nCeX404) {
    const fooCalleeParamX11273 = SSA_bNeX94;
    const fooArrElementX3223 = SSA_xNeX108;
    const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
    const fooReturnArgX5603 = RP$cloneX5(fooCalleeParamX11273, $, [4, fooArrElementX3223, fooArrElementX3225], PNeX191);
    return fooReturnArgX5603;
  };
  const fooReturnArgX5596 = function (nCeX400) {
    const fooCalleeParamX11231 = SSA_bNeX94;
    const fooArrElementX3211 = SSA_xNeX108;
    const fooArrElementX3213 = __(XT(nCeX400), Jq);
    const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, [4, fooArrElementX3211, fooArrElementX3213], TNeX211);
    return fooReturnArgX5597;
  };
  let ENeX311 = undefined;
  let FNeX55 = undefined;
  let HNeX48 = undefined;
  let INeX72 = undefined;
  let KNeX38 = undefined;
  let LNeX86 = undefined;
  let MNeX63 = undefined;
  let PNeX191 = undefined;
  let QNeX102 = undefined;
  let RNeX72 = undefined;
  let SSA_bNeX94 = mNeX765;
  let SSA_xNeX108 = gNeX352;
  let TNeX211 = undefined;
  let UNeX80 = undefined;
  let VNeX53 = undefined;
  let XNeX77 = undefined;
  let ZNeX45 = undefined;
  const fooReturnArgX5594 = function (nCeX399) {
    const fooReturnArgX5595 = RP$cloneX5(SSA_bNeX94, $, [5, SSA_xNeX108, nCeX399], ENeX311);
    return fooReturnArgX5595;
  };
  let jNeX68 = undefined;
  let kNeX164 = undefined;
  let vNeX134 = undefined;
  let wNeX70 = undefined;
  let SSA_SNeX76 = yNeX272;
  while (true) {
    const fooBinBothRhsX4240 = typeof SSA_SNeX76;
    if (`number` == fooBinBothRhsX4240) {
      const fooReturnArgX5593 = YE$cloneX5(SSA_bNeX94, $, SSA_xNeX108);
      return fooReturnArgX5593;
    } else {
      const fooSwitchTestX186 = SSA_SNeX76[0];
      let fooSwitchCaseToStartX352 = 24;
      if (0 === fooSwitchTestX186) {
        fooSwitchCaseToStartX352 = 0;
      } else {
        if (1 === fooSwitchTestX186) {
          fooSwitchCaseToStartX352 = 1;
        } else {
          if (2 === fooSwitchTestX186) {
            fooSwitchCaseToStartX352 = 2;
          } else {
            if (3 === fooSwitchTestX186) {
              fooSwitchCaseToStartX352 = 3;
            } else {
              if (4 === fooSwitchTestX186) {
                fooSwitchCaseToStartX352 = 4;
              } else {
                if (5 === fooSwitchTestX186) {
                  fooSwitchCaseToStartX352 = 5;
                } else {
                  if (6 === fooSwitchTestX186) {
                    fooSwitchCaseToStartX352 = 6;
                  } else {
                    if (7 === fooSwitchTestX186) {
                      fooSwitchCaseToStartX352 = 7;
                    } else {
                      if (8 === fooSwitchTestX186) {
                        fooSwitchCaseToStartX352 = 8;
                      } else {
                        if (9 === fooSwitchTestX186) {
                          fooSwitchCaseToStartX352 = 9;
                        } else {
                          if (10 === fooSwitchTestX186) {
                            fooSwitchCaseToStartX352 = 10;
                          } else {
                            if (11 === fooSwitchTestX186) {
                              fooSwitchCaseToStartX352 = 11;
                            } else {
                              if (12 === fooSwitchTestX186) {
                                fooSwitchCaseToStartX352 = 12;
                              } else {
                                if (13 === fooSwitchTestX186) {
                                  fooSwitchCaseToStartX352 = 13;
                                } else {
                                  if (14 === fooSwitchTestX186) {
                                    fooSwitchCaseToStartX352 = 14;
                                  } else {
                                    if (15 === fooSwitchTestX186) {
                                      fooSwitchCaseToStartX352 = 15;
                                    } else {
                                      if (16 === fooSwitchTestX186) {
                                        fooSwitchCaseToStartX352 = 16;
                                      } else {
                                        if (17 === fooSwitchTestX186) {
                                          fooSwitchCaseToStartX352 = 17;
                                        } else {
                                          if (18 === fooSwitchTestX186) {
                                            fooSwitchCaseToStartX352 = 18;
                                          } else {
                                            if (19 === fooSwitchTestX186) {
                                              fooSwitchCaseToStartX352 = 19;
                                            } else {
                                              if (20 === fooSwitchTestX186) {
                                                fooSwitchCaseToStartX352 = 20;
                                              } else {
                                                if (21 === fooSwitchTestX186) {
                                                  fooSwitchCaseToStartX352 = 21;
                                                } else {
                                                  if (22 === fooSwitchTestX186) {
                                                    fooSwitchCaseToStartX352 = 22;
                                                  } else {
                                                    if (23 === fooSwitchTestX186) {
                                                      fooSwitchCaseToStartX352 = 23;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (fooSwitchCaseToStartX352 <= 0) {
        ENeX311 = SSA_SNeX76[1];
        return fooReturnArgX5594;
      } else {
        if (fooSwitchCaseToStartX352 <= 1) {
          TNeX211 = SSA_SNeX76[1];
          return fooReturnArgX5596;
        } else {
          if (fooSwitchCaseToStartX352 <= 2) {
            const SSA_fooReturnArgX138 = NP$cloneX2$clone(
              $,
              SSA_bNeX94,
              $,
              SSA_xNeX108,
              SSA_SNeX76[2],
              SSA_SNeX76[1],
              fooCalleeParamX11238,
            );
            return SSA_fooReturnArgX138;
          } else {
            if (fooSwitchCaseToStartX352 <= 3) {
              const SSA_fooReturnArgX139 = NP$cloneX2$clone($, SSA_bNeX94, $, SSA_xNeX108, SSA_SNeX76[2], SSA_SNeX76[1], WA);
              return SSA_fooReturnArgX139;
            } else {
              if (fooSwitchCaseToStartX352 <= 4) {
                const SSA_fooReturnArgX140 = LP$cloneX2$clone(
                  $,
                  SSA_bNeX94,
                  $,
                  SSA_xNeX108,
                  SSA_SNeX76[4],
                  SSA_SNeX76[2],
                  SSA_SNeX76[3],
                  ZA,
                  SSA_SNeX76[1],
                );
                return SSA_fooReturnArgX140;
              } else {
                if (fooSwitchCaseToStartX352 <= 5) {
                  const SSA_fooReturnArgX141 = LP$cloneX2$clone(
                    $,
                    SSA_bNeX94,
                    $,
                    SSA_xNeX108,
                    SSA_SNeX76[4],
                    SSA_SNeX76[2],
                    SSA_SNeX76[3],
                    KA,
                    SSA_SNeX76[1],
                  );
                  return SSA_fooReturnArgX141;
                } else {
                  if (fooSwitchCaseToStartX352 <= 6) {
                    const SSA_fooReturnArgX142 = LP$cloneX2$clone(
                      $,
                      SSA_bNeX94,
                      $,
                      SSA_xNeX108,
                      SSA_SNeX76[4],
                      SSA_SNeX76[2],
                      SSA_SNeX76[3],
                      QA,
                      SSA_SNeX76[1],
                    );
                    return SSA_fooReturnArgX142;
                  } else {
                    if (fooSwitchCaseToStartX352 <= 7) {
                      const SSA_fooReturnArgX143 = LP$cloneX2$clone(
                        $,
                        SSA_bNeX94,
                        $,
                        SSA_xNeX108,
                        SSA_SNeX76[4],
                        SSA_SNeX76[2],
                        SSA_SNeX76[3],
                        $A,
                        SSA_SNeX76[1],
                      );
                      return SSA_fooReturnArgX143;
                    } else {
                      if (fooSwitchCaseToStartX352 <= 8) {
                        PNeX191 = SSA_SNeX76[4];
                        const NNeX135 = SSA_SNeX76[3];
                        const CNeX70 = SSA_SNeX76[2];
                        kNeX164 = SSA_SNeX76[1];
                        const fooBinBothRhsX4241 = typeof CNeX70;
                        if (`number` == fooBinBothRhsX4241) {
                          const fooBinBothRhsX4244 = typeof NNeX135;
                          if (`number` == fooBinBothRhsX4244) {
                            if (0 === NNeX135) {
                              return tmpClusterSSA_fooReturnArgX5600;
                            } else {
                              return tmpClusterSSA_fooReturnArgX5600$1;
                            }
                          } else {
                            vNeX134 = NNeX135[1];
                            return fooReturnArgX5599;
                          }
                        } else {
                          const fooBinBothRhsX4242 = CNeX70[0];
                          if (0 === fooBinBothRhsX4242) {
                            wNeX70 = CNeX70[2];
                            LNeX86 = CNeX70[1];
                            const fooBinBothRhsX4245 = typeof NNeX135;
                            if (`number` == fooBinBothRhsX4245) {
                              if (0 === NNeX135) {
                                return tmpClusterSSA_fooReturnArgX5605;
                              } else {
                                return tmpClusterSSA_fooReturnArgX5605$1;
                              }
                            } else {
                              INeX72 = NNeX135[1];
                              return fooReturnArgX5604;
                            }
                          } else {
                            jNeX68 = CNeX70[1];
                            const fooBinBothRhsX4243 = typeof NNeX135;
                            if (`number` == fooBinBothRhsX4243) {
                              if (0 === NNeX135) {
                                return tmpClusterSSA_fooReturnArgX5609;
                              } else {
                                return tmpClusterSSA_fooReturnArgX5609$1;
                              }
                            } else {
                              RNeX72 = NNeX135[1];
                              return fooReturnArgX5598;
                            }
                          }
                        }
                      } else {
                        if (fooSwitchCaseToStartX352 <= 9) {
                          DNeX65 = SSA_SNeX76[1];
                          return fooReturnArgX5613;
                        } else {
                          if (fooSwitchCaseToStartX352 <= 10) {
                            SSA_xNeX108 = [7, SSA_xNeX108];
                            SSA_SNeX76 = SSA_SNeX76[1];
                          } else {
                            if (fooSwitchCaseToStartX352 <= 11) {
                              const fooArrElementX3259 = SSA_SNeX76[1];
                              SSA_xNeX108 = [2, SSA_xNeX108, fooArrElementX3259];
                              SSA_SNeX76 = SSA_SNeX76[2];
                            } else {
                              if (fooSwitchCaseToStartX352 <= 12) {
                                const fooArrElementX3264 = SSA_SNeX76[1];
                                SSA_xNeX108 = [3, SSA_xNeX108, fooArrElementX3264];
                                SSA_SNeX76 = SSA_SNeX76[2];
                              } else {
                                if (fooSwitchCaseToStartX352 <= 13) {
                                  MNeX63 = SSA_SNeX76[3];
                                  const ONeX61 = SSA_SNeX76[2];
                                  const YNeX58 = Q_$clone($);
                                  _A(YNeX58, ONeX61);
                                  FNeX55 = TA(YNeX58);
                                  return fooReturnArgX5615;
                                } else {
                                  if (fooSwitchCaseToStartX352 <= 14) {
                                    VNeX53 = SSA_SNeX76[3];
                                    BNeX51 = SSA_SNeX76[2];
                                    return fooReturnArgX5617;
                                  } else {
                                    if (fooSwitchCaseToStartX352 <= 15) {
                                      UNeX80 = SSA_SNeX76[1];
                                      return fooReturnArgX5619;
                                    } else {
                                      if (fooSwitchCaseToStartX352 <= 16) {
                                        XNeX77 = SSA_SNeX76[1];
                                        return fooReturnArgX5622;
                                      } else {
                                        if (fooSwitchCaseToStartX352 <= 17) {
                                          const fooArrElementX3274 = SSA_SNeX76[1];
                                          SSA_xNeX108 = [0, SSA_xNeX108, fooArrElementX3274];
                                          SSA_SNeX76 = SSA_SNeX76[2];
                                        } else {
                                          if (fooSwitchCaseToStartX352 <= 18) {
                                            const WNeX66 = SSA_SNeX76[1];
                                            const fooBinBothRhsX4247 = WNeX66[0];
                                            const qNeX60 = SSA_SNeX76[2];
                                            const GNeX69 = WNeX66[1][1];
                                            const nCeX415 = SSA_xNeX108;
                                            const rCeX222 = SSA_bNeX94;
                                            if (0 === fooBinBothRhsX4247) {
                                              SSA_bNeX94 = function (iCeX154, oCeX143) {
                                                const fooArrElementX3277 = [0, oCeX143];
                                                const fooReturnArgX5625 = RP(rCeX222, iCeX154, [1, nCeX415, fooArrElementX3277], qNeX60);
                                                return fooReturnArgX5625;
                                              };
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            } else {
                                              SSA_bNeX94 = function (iCeX155, oCeX144) {
                                                const fooArrElementX3279 = [1, oCeX144];
                                                const fooReturnArgX5627 = RP(rCeX222, iCeX155, [1, nCeX415, fooArrElementX3279], qNeX60);
                                                return fooReturnArgX5627;
                                              };
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            }
                                          } else {
                                            if (fooSwitchCaseToStartX352 <= 19) {
                                              const fooThrowArgX300 = [0, WB, Rq];
                                              throw fooThrowArgX300;
                                            } else {
                                              if (fooSwitchCaseToStartX352 <= 20) {
                                                HNeX48 = SSA_SNeX76[3];
                                                ZNeX45 = [8, SSA_xNeX108, Mq];
                                                return fooReturnArgX5628;
                                              } else {
                                                if (fooSwitchCaseToStartX352 <= 21) {
                                                  KNeX38 = SSA_SNeX76[2];
                                                  return fooReturnArgX5630;
                                                } else {
                                                  if (fooSwitchCaseToStartX352 <= 22) {
                                                    QNeX102 = SSA_SNeX76[1];
                                                    return fooReturnArgX5632;
                                                  } else {
                                                    if (fooSwitchCaseToStartX352 <= 23) {
                                                      const $NeX101 = SSA_SNeX76[2];
                                                      const eCeX71 = SSA_SNeX76[1];
                                                      const fooBinBothRhsX4248 = typeof eCeX71;
                                                      if (`number` == fooBinBothRhsX4248) {
                                                        let fooSwitchCaseToStartX353 = 4;
                                                        if (0 === eCeX71) {
                                                          fooSwitchCaseToStartX353 = 0;
                                                        } else {
                                                          if (1 === eCeX71) {
                                                            fooSwitchCaseToStartX353 = 1;
                                                          } else {
                                                            if (2 === eCeX71) {
                                                              fooSwitchCaseToStartX353 = 2;
                                                            } else {
                                                              if (3 === eCeX71) {
                                                                fooSwitchCaseToStartX353 = 3;
                                                              }
                                                            }
                                                          }
                                                        }
                                                        if (fooSwitchCaseToStartX353 <= 0) {
                                                          const SSA_fooReturnArgX144 = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX144;
                                                        } else {
                                                          if (fooSwitchCaseToStartX353 <= 1) {
                                                            const SSA_fooReturnArgX145 = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX145;
                                                          } else {
                                                            if (fooSwitchCaseToStartX353 <= 2) {
                                                              const SSA_fooReturnArgX146 = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX146;
                                                            } else {
                                                              if (fooSwitchCaseToStartX353 <= 3) {
                                                                const fooThrowArgX301 = [0, WB, Oq];
                                                                throw fooThrowArgX301;
                                                              } else {
                                                                const SSA_fooReturnArgX147 = PP$cloneX3$clone(
                                                                  $,
                                                                  SSA_bNeX94,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX147;
                                                              }
                                                            }
                                                          }
                                                        }
                                                      } else {
                                                        const fooSwitchTestX187 = eCeX71[0];
                                                        let fooSwitchCaseToStartX354 = 10;
                                                        if (0 === fooSwitchTestX187) {
                                                          fooSwitchCaseToStartX354 = 0;
                                                        } else {
                                                          if (1 === fooSwitchTestX187) {
                                                            fooSwitchCaseToStartX354 = 1;
                                                          } else {
                                                            if (2 === fooSwitchTestX187) {
                                                              fooSwitchCaseToStartX354 = 2;
                                                            } else {
                                                              if (3 === fooSwitchTestX187) {
                                                                fooSwitchCaseToStartX354 = 3;
                                                              } else {
                                                                if (4 === fooSwitchTestX187) {
                                                                  fooSwitchCaseToStartX354 = 4;
                                                                } else {
                                                                  if (5 === fooSwitchTestX187) {
                                                                    fooSwitchCaseToStartX354 = 5;
                                                                  } else {
                                                                    if (6 === fooSwitchTestX187) {
                                                                      fooSwitchCaseToStartX354 = 6;
                                                                    } else {
                                                                      if (7 === fooSwitchTestX187) {
                                                                        fooSwitchCaseToStartX354 = 7;
                                                                      } else {
                                                                        if (8 === fooSwitchTestX187) {
                                                                          fooSwitchCaseToStartX354 = 8;
                                                                        } else {
                                                                          if (9 === fooSwitchTestX187) {
                                                                            fooSwitchCaseToStartX354 = 9;
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                        if (fooSwitchCaseToStartX354 <= 0) {
                                                          const SSA_fooReturnArgX148 = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX148;
                                                        } else {
                                                          if (fooSwitchCaseToStartX354 <= 1) {
                                                            const SSA_fooReturnArgX149 = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX149;
                                                          } else {
                                                            if (fooSwitchCaseToStartX354 <= 2) {
                                                              const SSA_fooReturnArgX150 = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX150;
                                                            } else {
                                                              if (fooSwitchCaseToStartX354 <= 3) {
                                                                const SSA_fooReturnArgX151 = PP$cloneX3$clone(
                                                                  $,
                                                                  SSA_bNeX94,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX151;
                                                              } else {
                                                                if (fooSwitchCaseToStartX354 <= 4) {
                                                                  const SSA_fooReturnArgX152 = PP$cloneX3$clone(
                                                                    $,
                                                                    SSA_bNeX94,
                                                                    $,
                                                                    SSA_xNeX108,
                                                                    $NeX101,
                                                                  );
                                                                  return SSA_fooReturnArgX152;
                                                                } else {
                                                                  if (fooSwitchCaseToStartX354 <= 5) {
                                                                    const SSA_fooReturnArgX153 = PP$cloneX3$clone(
                                                                      $,
                                                                      SSA_bNeX94,
                                                                      $,
                                                                      SSA_xNeX108,
                                                                      $NeX101,
                                                                    );
                                                                    return SSA_fooReturnArgX153;
                                                                  } else {
                                                                    if (fooSwitchCaseToStartX354 <= 6) {
                                                                      const SSA_fooReturnArgX154 = PP$cloneX3$clone(
                                                                        $,
                                                                        SSA_bNeX94,
                                                                        $,
                                                                        SSA_xNeX108,
                                                                        $NeX101,
                                                                      );
                                                                      return SSA_fooReturnArgX154;
                                                                    } else {
                                                                      if (fooSwitchCaseToStartX354 <= 7) {
                                                                        const SSA_fooReturnArgX155 = PP$cloneX3$clone(
                                                                          $,
                                                                          SSA_bNeX94,
                                                                          $,
                                                                          SSA_xNeX108,
                                                                          $NeX101,
                                                                        );
                                                                        return SSA_fooReturnArgX155;
                                                                      } else {
                                                                        if (fooSwitchCaseToStartX354 <= 8) {
                                                                          const SSA_fooReturnArgX156 = _P$cloneX4$clone(
                                                                            $,
                                                                            SSA_bNeX94,
                                                                            $,
                                                                            SSA_xNeX108,
                                                                            eCeX71[2],
                                                                            $NeX101,
                                                                          );
                                                                          return SSA_fooReturnArgX156;
                                                                        } else {
                                                                          const SSA_fooReturnArgX157 = PP$cloneX3$clone(
                                                                            $,
                                                                            SSA_bNeX94,
                                                                            $,
                                                                            SSA_xNeX108,
                                                                            $NeX101,
                                                                          );
                                                                          return SSA_fooReturnArgX157;
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    } else {
                                                      const SSA_fooReturnArgX159 = IP$cloneX3$cloneX1(
                                                        $,
                                                        SSA_bNeX94,
                                                        $,
                                                        SSA_xNeX108,
                                                        SSA_SNeX76[3],
                                                        SSA_SNeX76[1],
                                                        OE$clone(SSA_SNeX76[2], $),
                                                      );
                                                      return SSA_fooReturnArgX159;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  return c;
};
const d = function($$0,$$1,$$2,$$3,$$4 ) {
  const e = $$1;
  const f = $$3;
  const g = $$4;
  debugger;
  const h = function($$0,$$1,$$2 ) {
    const i = $$0;
    const j = $$1;
    const k = $$2;
    debugger;
    const l = m;
    const n = o;
    const p = q;
    const r = SP( s, j, k );
    const t = UA( p, i, r );
    const u = [ 4, n, t ];
    const v = RP$cloneX5( l, $, u, w );
    return v;
  };
  const x = function($$0,$$1 ) {
    const y = $$0;
    const z = $$1;
    debugger;
    const ba = m;
    const bb = o;
    const bc = q;
    const bd = SP( s, zAe, z );
    const be = UA( bc, y, bd );
    const bf = [ 4, bb, be ];
    const bg = RP$cloneX5( ba, $, bf, w );
    return bg;
  };
  const bh = function($$0,$$1 ) {
    const bi = $$0;
    const bj = $$1;
    debugger;
    const bk = m;
    const bl = o;
    const bm = bn;
    const bo = bp;
    const bq = SP( s, bi, bj );
    const br = UA( bm, bo, bq );
    const bs = [ 4, bl, br ];
    const bt = RP$cloneX5( bk, $, bs, w );
    return bt;
  };
  const bu = function($$0 ) {
    const bv = $$0;
    debugger;
    const bw = m;
    const bx = o;
    const by = bn;
    const bz = bp;
    const ca = SP( s, zAe, bv );
    const cb = UA( by, bz, ca );
    const cc = [ 4, bx, cb ];
    const cd = RP$cloneX5( bw, $, cc, w );
    return cd;
  };
  const ce = function($$0,$$1 ) {
    const cf = $$0;
    const cg = $$1;
    debugger;
    const ch = m;
    const ci = o;
    const cj = SP( s, cf, cg );
    const ck = [ 4, ci, cj ];
    const cl = RP$cloneX5( ch, $, ck, w );
    return cl;
  };
  const cm = function($$0 ) {
    const cn = $$0;
    debugger;
    const co = m;
    const cp = o;
    const cq = SP( s, zAe, cn );
    const cr = [ 4, cp, cq ];
    const cs = RP$cloneX5( co, $, cr, w );
    return cs;
  };
  const ct = function($$0 ) {
    const cu = $$0;
    debugger;
    const cv = m;
    const cw = [ 5, o, cu ];
    const cx = RP$cloneX5( cv, $, cw, cy );
    return cx;
  };
  const cz = function($$0 ) {
    const da = $$0;
    debugger;
    const db = m;
    const dc = o;
    const dd = $yX2( Iq, da );
    const de = [ 4, dc, dd ];
    const df = RP$cloneX5( db, $, de, dg );
    return df;
  };
  const dh = function() {
    debugger;
    const di = RP$cloneX5( m, $, dj, dk );
    return di;
  };
  const dl = function($$0 ) {
    const dm = $$0;
    debugger;
    const dn = m;
    const dp = [ 6, o, dm ];
    const dq = RP$cloneX5( dn, $, dp, dr );
    return dq;
  };
  const ds = function($$0,$$1 ) {
    const dt = $$0;
    const du = $$1;
    debugger;
    const dv = m;
    const dw = o;
    const dx = function($$0 ) {
      const dy = $$0;
      debugger;
      const dz = YE( dt, dy, du );
      return dz;
    };
    const ea = [ 6, dw, dx ];
    const eb = RP$cloneX5( dv, $, ea, ec );
    return eb;
  };
  let ed = undefined;
  const ee = function($$0 ) {
    const ef = $$0;
    debugger;
    const eg = ef[ 1 ];
    const eh = PA( ed );
    const ei = WE( eh );
    const ej = YA( eg, ei );
    const ek = ej[ 2 ];
    const el = typeof ek;
    const em = "number" == el;
    if (em) {
      const en = m;
      const eo = o;
      const ep = ej[ 1 ];
      const eq = ZE( ep, er );
      const es = RP$cloneX5( en, $, eo, eq );
      return es;
    }
    else {
      throw JAe;
    }
  };
  const et = function() {
    debugger;
    const eu = m;
    const ev = [ 4, o, ew ];
    const ex = RP$cloneX5( eu, $, ev, ey );
    return ex;
  };
  let ez = undefined;
  const fa = function($$0 ) {
    const fb = $$0;
    debugger;
    let fc = undefined;
    if (fb) {
      fc = TU;
    }
    else {
      fc = _U;
    }
    const fd = m;
    const fe = [ 4, o, fc ];
    const ff = RP$cloneX5( fd, $, fe, ez );
    return ff;
  };
  const fg = function($$0,$$1 ) {
    const fh = $$0;
    const fi = $$1;
    debugger;
    const fj = m;
    const fk = o;
    const fl = q;
    const fm = SP( s, fn, fi );
    const fo = UA( fl, fh, fm );
    const fp = [ 4, fk, fo ];
    const fq = RP$cloneX5( fj, $, fp, w );
    return fq;
  };
  const fr = function($$0 ) {
    const fs = $$0;
    debugger;
    const ft = m;
    const fu = o;
    const fv = bn;
    const fw = bp;
    const fx = SP( s, fy, fs );
    const fz = UA( fv, fw, fx );
    const ga = [ 4, fu, fz ];
    const gb = RP$cloneX5( ft, $, ga, w );
    return gb;
  };
  const gc = function($$0 ) {
    const gd = $$0;
    debugger;
    const ge = m;
    const gf = o;
    const gg = SP( s, gh, gd );
    const gi = [ 4, gf, gg ];
    const gj = RP$cloneX5( ge, $, gi, w );
    return gj;
  };
  const gk = function($$0 ) {
    const gl = $$0;
    debugger;
    const gm = m;
    const gn = o;
    const go = XT( gl );
    const gp = __( go, Jq );
    const gq = [ 4, gn, gp ];
    const gr = RP$cloneX5( gm, $, gq, gs );
    return gr;
  };
  let gt = undefined;
  let ew = undefined;
  let dk = undefined;
  let fy = undefined;
  let dg = undefined;
  let bn = undefined;
  let ey = undefined;
  let w = undefined;
  let cy = undefined;
  let fn = undefined;
  let m = e;
  let o = f;
  let gs = undefined;
  let ec = undefined;
  let er = undefined;
  let dr = undefined;
  let dj = undefined;
  const gu = function($$0 ) {
    const gv = $$0;
    debugger;
    const gw = m;
    const gx = [ 5, o, gv ];
    const gy = RP$cloneX5( gw, $, gx, gt );
    return gy;
  };
  let q = undefined;
  let s = undefined;
  let gh = undefined;
  let bp = undefined;
  let gz = g;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const ha = typeof gz;
    const hb = "number" == ha;
    if (hb) {
      const hc = YE$cloneX5( m, $, o );
      return hc;
    }
    else {
      const hd = gz[ 0 ];
      let he = 24;
      const hf = 0 === hd;
      if (hf) {
        he = 0;
      }
      else {
        const hg = 1 === hd;
        if (hg) {
          he = 1;
        }
        else {
          const hh = 2 === hd;
          if (hh) {
            he = 2;
          }
          else {
            const hi = 3 === hd;
            if (hi) {
              he = 3;
            }
            else {
              const hj = 4 === hd;
              if (hj) {
                he = 4;
              }
              else {
                const hk = 5 === hd;
                if (hk) {
                  he = 5;
                }
                else {
                  const hl = 6 === hd;
                  if (hl) {
                    he = 6;
                  }
                  else {
                    const hm = 7 === hd;
                    if (hm) {
                      he = 7;
                    }
                    else {
                      const hn = 8 === hd;
                      if (hn) {
                        he = 8;
                      }
                      else {
                        const ho = 9 === hd;
                        if (ho) {
                          he = 9;
                        }
                        else {
                          const hp = 10 === hd;
                          if (hp) {
                            he = 10;
                          }
                          else {
                            const hq = 11 === hd;
                            if (hq) {
                              he = 11;
                            }
                            else {
                              const hr = 12 === hd;
                              if (hr) {
                                he = 12;
                              }
                              else {
                                const hs = 13 === hd;
                                if (hs) {
                                  he = 13;
                                }
                                else {
                                  const ht = 14 === hd;
                                  if (ht) {
                                    he = 14;
                                  }
                                  else {
                                    const hu = 15 === hd;
                                    if (hu) {
                                      he = 15;
                                    }
                                    else {
                                      const hv = 16 === hd;
                                      if (hv) {
                                        he = 16;
                                      }
                                      else {
                                        const hw = 17 === hd;
                                        if (hw) {
                                          he = 17;
                                        }
                                        else {
                                          const hx = 18 === hd;
                                          if (hx) {
                                            he = 18;
                                          }
                                          else {
                                            const hy = 19 === hd;
                                            if (hy) {
                                              he = 19;
                                            }
                                            else {
                                              const hz = 20 === hd;
                                              if (hz) {
                                                he = 20;
                                              }
                                              else {
                                                const ia = 21 === hd;
                                                if (ia) {
                                                  he = 21;
                                                }
                                                else {
                                                  const ib = 22 === hd;
                                                  if (ib) {
                                                    he = 22;
                                                  }
                                                  else {
                                                    const ic = 23 === hd;
                                                    if (ic) {
                                                      he = 23;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      const id = he <= 0;
      if (id) {
        gt = gz[ 1 ];
        return gu;
      }
      else {
        const ie = he <= 1;
        if (ie) {
          gs = gz[ 1 ];
          return gk;
        }
        else {
          const ig = he <= 2;
          if (ig) {
            const ih = gz[ 2 ];
            const ii = gz[ 1 ];
            const ij = NP$cloneX2$clone( $, m, $, o, ih, ii, a );
            return ij;
          }
          else {
            const ik = he <= 3;
            if (ik) {
              const il = gz[ 2 ];
              const im = gz[ 1 ];
              const io = NP$cloneX2$clone( $, m, $, o, il, im, WA );
              return io;
            }
            else {
              const ip = he <= 4;
              if (ip) {
                const iq = gz[ 4 ];
                const ir = gz[ 2 ];
                const is = gz[ 3 ];
                const it = gz[ 1 ];
                const iu = LP$cloneX2$clone( $, m, $, o, iq, ir, is, ZA, it );
                return iu;
              }
              else {
                const iv = he <= 5;
                if (iv) {
                  const iw = gz[ 4 ];
                  const ix = gz[ 2 ];
                  const iy = gz[ 3 ];
                  const iz = gz[ 1 ];
                  const ja = LP$cloneX2$clone( $, m, $, o, iw, ix, iy, KA, iz );
                  return ja;
                }
                else {
                  const jb = he <= 6;
                  if (jb) {
                    const jc = gz[ 4 ];
                    const jd = gz[ 2 ];
                    const je = gz[ 3 ];
                    const jf = gz[ 1 ];
                    const jg = LP$cloneX2$clone( $, m, $, o, jc, jd, je, QA, jf );
                    return jg;
                  }
                  else {
                    const jh = he <= 7;
                    if (jh) {
                      const ji = gz[ 4 ];
                      const jj = gz[ 2 ];
                      const jk = gz[ 3 ];
                      const jl = gz[ 1 ];
                      const jm = LP$cloneX2$clone( $, m, $, o, ji, jj, jk, $A, jl );
                      return jm;
                    }
                    else {
                      const jn = he <= 8;
                      if (jn) {
                        w = gz[ 4 ];
                        const jo = gz[ 3 ];
                        const jp = gz[ 2 ];
                        s = gz[ 1 ];
                        const jq = typeof jp;
                        const jr = "number" == jq;
                        if (jr) {
                          const js = typeof jo;
                          const jt = "number" == js;
                          if (jt) {
                            const ju = 0 === jo;
                            if (ju) {
                              return cm;
                            }
                            else {
                              return ce;
                            }
                          }
                          else {
                            gh = jo[ 1 ];
                            return gc;
                          }
                        }
                        else {
                          const jv = jp[ 0 ];
                          const jw = 0 === jv;
                          if (jw) {
                            bp = jp[ 2 ];
                            bn = jp[ 1 ];
                            const jx = typeof jo;
                            const jy = "number" == jx;
                            if (jy) {
                              const jz = 0 === jo;
                              if (jz) {
                                return bu;
                              }
                              else {
                                return bh;
                              }
                            }
                            else {
                              fy = jo[ 1 ];
                              return fr;
                            }
                          }
                          else {
                            q = jp[ 1 ];
                            const ka = typeof jo;
                            const kb = "number" == ka;
                            if (kb) {
                              const kc = 0 === jo;
                              if (kc) {
                                return x;
                              }
                              else {
                                return h;
                              }
                            }
                            else {
                              fn = jo[ 1 ];
                              return fg;
                            }
                          }
                        }
                      }
                      else {
                        const kd = he <= 9;
                        if (kd) {
                          ez = gz[ 1 ];
                          return fa;
                        }
                        else {
                          const ke = he <= 10;
                          if (ke) {
                            o = [ 7, o ];
                            gz = gz[ 1 ];
                          }
                          else {
                            const kf = he <= 11;
                            if (kf) {
                              const kg = gz[ 1 ];
                              o = [ 2, o, kg ];
                              gz = gz[ 2 ];
                            }
                            else {
                              const kh = he <= 12;
                              if (kh) {
                                const ki = gz[ 1 ];
                                o = [ 3, o, ki ];
                                gz = gz[ 2 ];
                              }
                              else {
                                const kj = he <= 13;
                                if (kj) {
                                  ey = gz[ 3 ];
                                  const kk = gz[ 2 ];
                                  const kl = Q_$clone( $ );
                                  _A( kl, kk );
                                  ew = TA( kl );
                                  return et;
                                }
                                else {
                                  const km = he <= 14;
                                  if (km) {
                                    er = gz[ 3 ];
                                    ed = gz[ 2 ];
                                    return ee;
                                  }
                                  else {
                                    const kn = he <= 15;
                                    if (kn) {
                                      ec = gz[ 1 ];
                                      return ds;
                                    }
                                    else {
                                      const ko = he <= 16;
                                      if (ko) {
                                        dr = gz[ 1 ];
                                        return dl;
                                      }
                                      else {
                                        const kp = he <= 17;
                                        if (kp) {
                                          const kq = gz[ 1 ];
                                          o = [ 0, o, kq ];
                                          gz = gz[ 2 ];
                                        }
                                        else {
                                          const kr = he <= 18;
                                          if (kr) {
                                            const ks = gz[ 1 ];
                                            const kt = ks[ 0 ];
                                            const ku = gz[ 2 ];
                                            const kv = ks[ 1 ];
                                            const kw = kv[ 1 ];
                                            const kx = o;
                                            const ky = m;
                                            const kz = 0 === kt;
                                            if (kz) {
                                              m = function($$0,$$1 ) {
                                                const la = $$0;
                                                const lb = $$1;
                                                debugger;
                                                const lc = [ 0, lb ];
                                                const ld = [ 1, kx, lc ];
                                                const le = RP( ky, la, ld, ku );
                                                return le;
                                              };
                                              o = 0;
                                              gz = kw;
                                            }
                                            else {
                                              m = function($$0,$$1 ) {
                                                const lf = $$0;
                                                const lg = $$1;
                                                debugger;
                                                const lh = [ 1, lg ];
                                                const li = [ 1, kx, lh ];
                                                const lj = RP( ky, lf, li, ku );
                                                return lj;
                                              };
                                              o = 0;
                                              gz = kw;
                                            }
                                          }
                                          else {
                                            const lk = he <= 19;
                                            if (lk) {
                                              const ll = [ 0, WB, Rq ];
                                              throw ll;
                                            }
                                            else {
                                              const lm = he <= 20;
                                              if (lm) {
                                                dk = gz[ 3 ];
                                                dj = [ 8, o, Mq ];
                                                return dh;
                                              }
                                              else {
                                                const ln = he <= 21;
                                                if (ln) {
                                                  dg = gz[ 2 ];
                                                  return cz;
                                                }
                                                else {
                                                  const lo = he <= 22;
                                                  if (lo) {
                                                    cy = gz[ 1 ];
                                                    return ct;
                                                  }
                                                  else {
                                                    const lp = he <= 23;
                                                    if (lp) {
                                                      const lq = gz[ 2 ];
                                                      const lr = gz[ 1 ];
                                                      const ls = typeof lr;
                                                      const lt = "number" == ls;
                                                      if (lt) {
                                                        let lu = 4;
                                                        const lv = 0 === lr;
                                                        if (lv) {
                                                          lu = 0;
                                                        }
                                                        else {
                                                          const lw = 1 === lr;
                                                          if (lw) {
                                                            lu = 1;
                                                          }
                                                          else {
                                                            const lx = 2 === lr;
                                                            if (lx) {
                                                              lu = 2;
                                                            }
                                                            else {
                                                              const ly = 3 === lr;
                                                              if (ly) {
                                                                lu = 3;
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const lz = lu <= 0;
                                                        if (lz) {
                                                          const ma = PP$cloneX3$clone( $, m, $, o, lq );
                                                          return ma;
                                                        }
                                                        else {
                                                          const mb = lu <= 1;
                                                          if (mb) {
                                                            const mc = PP$cloneX3$clone( $, m, $, o, lq );
                                                            return mc;
                                                          }
                                                          else {
                                                            const md = lu <= 2;
                                                            if (md) {
                                                              const me = PP$cloneX3$clone( $, m, $, o, lq );
                                                              return me;
                                                            }
                                                            else {
                                                              const mf = lu <= 3;
                                                              if (mf) {
                                                                const mg = [ 0, WB, Oq ];
                                                                throw mg;
                                                              }
                                                              else {
                                                                const mh = PP$cloneX3$clone( $, m, $, o, lq );
                                                                return mh;
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                      else {
                                                        const mi = lr[ 0 ];
                                                        let mj = 10;
                                                        const mk = 0 === mi;
                                                        if (mk) {
                                                          mj = 0;
                                                        }
                                                        else {
                                                          const ml = 1 === mi;
                                                          if (ml) {
                                                            mj = 1;
                                                          }
                                                          else {
                                                            const mm = 2 === mi;
                                                            if (mm) {
                                                              mj = 2;
                                                            }
                                                            else {
                                                              const mn = 3 === mi;
                                                              if (mn) {
                                                                mj = 3;
                                                              }
                                                              else {
                                                                const mo = 4 === mi;
                                                                if (mo) {
                                                                  mj = 4;
                                                                }
                                                                else {
                                                                  const mp = 5 === mi;
                                                                  if (mp) {
                                                                    mj = 5;
                                                                  }
                                                                  else {
                                                                    const mq = 6 === mi;
                                                                    if (mq) {
                                                                      mj = 6;
                                                                    }
                                                                    else {
                                                                      const mr = 7 === mi;
                                                                      if (mr) {
                                                                        mj = 7;
                                                                      }
                                                                      else {
                                                                        const ms = 8 === mi;
                                                                        if (ms) {
                                                                          mj = 8;
                                                                        }
                                                                        else {
                                                                          const mt = 9 === mi;
                                                                          if (mt) {
                                                                            mj = 9;
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const mu = mj <= 0;
                                                        if (mu) {
                                                          const mv = PP$cloneX3$clone( $, m, $, o, lq );
                                                          return mv;
                                                        }
                                                        else {
                                                          const mw = mj <= 1;
                                                          if (mw) {
                                                            const mx = PP$cloneX3$clone( $, m, $, o, lq );
                                                            return mx;
                                                          }
                                                          else {
                                                            const my = mj <= 2;
                                                            if (my) {
                                                              const mz = PP$cloneX3$clone( $, m, $, o, lq );
                                                              return mz;
                                                            }
                                                            else {
                                                              const na = mj <= 3;
                                                              if (na) {
                                                                const nb = PP$cloneX3$clone( $, m, $, o, lq );
                                                                return nb;
                                                              }
                                                              else {
                                                                const nc = mj <= 4;
                                                                if (nc) {
                                                                  const nd = PP$cloneX3$clone( $, m, $, o, lq );
                                                                  return nd;
                                                                }
                                                                else {
                                                                  const ne = mj <= 5;
                                                                  if (ne) {
                                                                    const nf = PP$cloneX3$clone( $, m, $, o, lq );
                                                                    return nf;
                                                                  }
                                                                  else {
                                                                    const ng = mj <= 6;
                                                                    if (ng) {
                                                                      const nh = PP$cloneX3$clone( $, m, $, o, lq );
                                                                      return nh;
                                                                    }
                                                                    else {
                                                                      const ni = mj <= 7;
                                                                      if (ni) {
                                                                        const nj = PP$cloneX3$clone( $, m, $, o, lq );
                                                                        return nj;
                                                                      }
                                                                      else {
                                                                        const nk = mj <= 8;
                                                                        if (nk) {
                                                                          const nl = lr[ 2 ];
                                                                          const nm = _P$cloneX4$clone( $, m, $, o, nl, lq );
                                                                          return nm;
                                                                        }
                                                                        else {
                                                                          const nn = PP$cloneX3$clone( $, m, $, o, lq );
                                                                          return nn;
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                    else {
                                                      const no = gz[ 3 ];
                                                      const np = gz[ 1 ];
                                                      const nq = gz[ 2 ];
                                                      const nr = OE$clone( nq, $ );
                                                      const ns = IP$cloneX3$cloneX1( $, m, $, o, no, np, nr );
                                                      return ns;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return undefined;
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let TP$cloneX2$cloneX1 = function ($$0, $$1, $$2, $$3, $$4) {
  let fNeX1786 = $$0;
  let mNeX765 = $$1;
  let hNeX475 = $$2;
  let gNeX352 = $$3;
  let yNeX272 = $$4;
  debugger;
  let BNeX51 = undefined;
  let DNeX65 = undefined;
  let ENeX311 = undefined;
  let FNeX55 = undefined;
  let HNeX48 = undefined;
  let INeX72 = undefined;
  let KNeX38 = undefined;
  let LNeX86 = undefined;
  let MNeX63 = undefined;
  let PNeX191 = undefined;
  let QNeX102 = undefined;
  let RNeX72 = undefined;
  let TNeX211 = undefined;
  let UNeX80 = undefined;
  let VNeX53 = undefined;
  let XNeX77 = undefined;
  let ZNeX45 = undefined;
  let jNeX68 = undefined;
  let kNeX164 = undefined;
  let vNeX134 = undefined;
  let wNeX70 = undefined;
  let SSA_bNeX94 = mNeX765;
  let SSA_xNeX108 = gNeX352;
  let SSA_SNeX76 = yNeX272;
  while (true) {
    $continue: {
      const fooBinBothRhsX4240 = typeof SSA_SNeX76;
      const fooIfTestX13134 = `number` == fooBinBothRhsX4240;
      if (fooIfTestX13134) {
        const fooReturnArgX5593 = YE$cloneX5(SSA_bNeX94, $, SSA_xNeX108);
        return fooReturnArgX5593;
      } else {
        const fooSwitchTestX186 = SSA_SNeX76[0];
        let fooSwitchCaseToStartX352 = 24;
        const fooIfTestX13135 = 0 === fooSwitchTestX186;
        if (fooIfTestX13135) {
          fooSwitchCaseToStartX352 = 0;
        } else {
          const fooIfTestX13161 = 1 === fooSwitchTestX186;
          if (fooIfTestX13161) {
            fooSwitchCaseToStartX352 = 1;
          } else {
            const fooIfTestX13162 = 2 === fooSwitchTestX186;
            if (fooIfTestX13162) {
              fooSwitchCaseToStartX352 = 2;
            } else {
              const fooIfTestX13163 = 3 === fooSwitchTestX186;
              if (fooIfTestX13163) {
                fooSwitchCaseToStartX352 = 3;
              } else {
                const fooIfTestX13164 = 4 === fooSwitchTestX186;
                if (fooIfTestX13164) {
                  fooSwitchCaseToStartX352 = 4;
                } else {
                  const fooIfTestX13165 = 5 === fooSwitchTestX186;
                  if (fooIfTestX13165) {
                    fooSwitchCaseToStartX352 = 5;
                  } else {
                    const fooIfTestX13166 = 6 === fooSwitchTestX186;
                    if (fooIfTestX13166) {
                      fooSwitchCaseToStartX352 = 6;
                    } else {
                      const fooIfTestX13167 = 7 === fooSwitchTestX186;
                      if (fooIfTestX13167) {
                        fooSwitchCaseToStartX352 = 7;
                      } else {
                        const fooIfTestX13168 = 8 === fooSwitchTestX186;
                        if (fooIfTestX13168) {
                          fooSwitchCaseToStartX352 = 8;
                        } else {
                          const fooIfTestX13169 = 9 === fooSwitchTestX186;
                          if (fooIfTestX13169) {
                            fooSwitchCaseToStartX352 = 9;
                          } else {
                            const fooIfTestX13170 = 10 === fooSwitchTestX186;
                            if (fooIfTestX13170) {
                              fooSwitchCaseToStartX352 = 10;
                            } else {
                              const fooIfTestX13171 = 11 === fooSwitchTestX186;
                              if (fooIfTestX13171) {
                                fooSwitchCaseToStartX352 = 11;
                              } else {
                                const fooIfTestX13172 = 12 === fooSwitchTestX186;
                                if (fooIfTestX13172) {
                                  fooSwitchCaseToStartX352 = 12;
                                } else {
                                  const fooIfTestX13173 = 13 === fooSwitchTestX186;
                                  if (fooIfTestX13173) {
                                    fooSwitchCaseToStartX352 = 13;
                                  } else {
                                    const fooIfTestX13174 = 14 === fooSwitchTestX186;
                                    if (fooIfTestX13174) {
                                      fooSwitchCaseToStartX352 = 14;
                                    } else {
                                      const fooIfTestX13175 = 15 === fooSwitchTestX186;
                                      if (fooIfTestX13175) {
                                        fooSwitchCaseToStartX352 = 15;
                                      } else {
                                        const fooIfTestX13176 = 16 === fooSwitchTestX186;
                                        if (fooIfTestX13176) {
                                          fooSwitchCaseToStartX352 = 16;
                                        } else {
                                          const fooIfTestX13177 = 17 === fooSwitchTestX186;
                                          if (fooIfTestX13177) {
                                            fooSwitchCaseToStartX352 = 17;
                                          } else {
                                            const fooIfTestX13178 = 18 === fooSwitchTestX186;
                                            if (fooIfTestX13178) {
                                              fooSwitchCaseToStartX352 = 18;
                                            } else {
                                              const fooIfTestX13179 = 19 === fooSwitchTestX186;
                                              if (fooIfTestX13179) {
                                                fooSwitchCaseToStartX352 = 19;
                                              } else {
                                                const fooIfTestX13180 = 20 === fooSwitchTestX186;
                                                if (fooIfTestX13180) {
                                                  fooSwitchCaseToStartX352 = 20;
                                                } else {
                                                  const fooIfTestX13181 = 21 === fooSwitchTestX186;
                                                  if (fooIfTestX13181) {
                                                    fooSwitchCaseToStartX352 = 21;
                                                  } else {
                                                    const fooIfTestX13182 = 22 === fooSwitchTestX186;
                                                    if (fooIfTestX13182) {
                                                      fooSwitchCaseToStartX352 = 22;
                                                    } else {
                                                      const fooIfTestX13183 = 23 === fooSwitchTestX186;
                                                      if (fooIfTestX13183) {
                                                        fooSwitchCaseToStartX352 = 23;
                                                      } else {
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        const fooIfTestX13136 = fooSwitchCaseToStartX352 <= 0;
        if (fooIfTestX13136) {
          ENeX311 = SSA_SNeX76[1];
          const fooReturnArgX5594 = function ($$0) {
            let nCeX399 = $$0;
            debugger;
            const fooCalleeParamX11228 = SSA_bNeX94;
            const fooCalleeParamX11229 = [5, SSA_xNeX108, nCeX399];
            const fooCalleeParamX11230 = ENeX311;
            const fooReturnArgX5595 = RP$cloneX5(fooCalleeParamX11228, $, fooCalleeParamX11229, ENeX311);
            return fooReturnArgX5595;
          };
          return fooReturnArgX5594;
        } else {
          const fooIfTestX13137 = fooSwitchCaseToStartX352 <= 1;
          if (fooIfTestX13137) {
            TNeX211 = SSA_SNeX76[1];
            const fooReturnArgX5596 = function ($$0) {
              let nCeX400 = $$0;
              debugger;
              const fooCalleeParamX11231 = SSA_bNeX94;
              const fooArrElementX3211 = SSA_xNeX108;
              const fooCalleeParamX11232 = XT(nCeX400);
              const fooCalleeParamX11233 = Jq;
              const fooArrElementX3213 = __(fooCalleeParamX11232, Jq);
              const fooCalleeParamX11234 = [4, fooArrElementX3211, fooArrElementX3213];
              const fooCalleeParamX11235 = TNeX211;
              const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, TNeX211);
              return fooReturnArgX5597;
            };
            return fooReturnArgX5596;
          } else {
            const fooIfTestX13138 = fooSwitchCaseToStartX352 <= 2;
            if (fooIfTestX13138) {
              const _NeX233 = SSA_SNeX76[2];
              const ANeX206 = SSA_SNeX76[1];
              const fooCalleeParamX11236 = SSA_bNeX94;
              const fooCalleeParamX11237 = SSA_xNeX108;
              const fooCalleeParamX11238 = function ($$0) {
                let nCeX401 = $$0;
                debugger;
                return nCeX401;
              };
              const SSA_fooReturnArgX138 = NP$cloneX2$clone(
                $,
                fooCalleeParamX11236,
                $,
                fooCalleeParamX11237,
                _NeX233,
                ANeX206,
                fooCalleeParamX11238,
              );
              return SSA_fooReturnArgX138;
            } else {
              const fooIfTestX13139 = fooSwitchCaseToStartX352 <= 3;
              if (fooIfTestX13139) {
                const fooCalleeParamX11239 = SSA_bNeX94;
                const fooCalleeParamX11240 = SSA_xNeX108;
                const fooCalleeParamX11241 = SSA_SNeX76[2];
                const fooCalleeParamX11242 = SSA_SNeX76[1];
                const SSA_fooReturnArgX139 = NP$cloneX2$clone(
                  $,
                  fooCalleeParamX11239,
                  $,
                  fooCalleeParamX11240,
                  fooCalleeParamX11241,
                  fooCalleeParamX11242,
                  WA,
                );
                return SSA_fooReturnArgX139;
              } else {
                const fooIfTestX13140 = fooSwitchCaseToStartX352 <= 4;
                if (fooIfTestX13140) {
                  const fooCalleeParamX11243 = SSA_bNeX94;
                  const fooCalleeParamX11244 = SSA_xNeX108;
                  const fooCalleeParamX11245 = SSA_SNeX76[4];
                  const fooCalleeParamX11246 = SSA_SNeX76[2];
                  const fooCalleeParamX11247 = SSA_SNeX76[3];
                  const fooCalleeParamX11248 = SSA_SNeX76[1];
                  const SSA_fooReturnArgX140 = LP$cloneX2$clone(
                    $,
                    fooCalleeParamX11243,
                    $,
                    fooCalleeParamX11244,
                    fooCalleeParamX11245,
                    fooCalleeParamX11246,
                    fooCalleeParamX11247,
                    ZA,
                    fooCalleeParamX11248,
                  );
                  return SSA_fooReturnArgX140;
                } else {
                  const fooIfTestX13141 = fooSwitchCaseToStartX352 <= 5;
                  if (fooIfTestX13141) {
                    const fooCalleeParamX11249 = SSA_bNeX94;
                    const fooCalleeParamX11250 = SSA_xNeX108;
                    const fooCalleeParamX11251 = SSA_SNeX76[4];
                    const fooCalleeParamX11252 = SSA_SNeX76[2];
                    const fooCalleeParamX11253 = SSA_SNeX76[3];
                    const fooCalleeParamX11254 = SSA_SNeX76[1];
                    const SSA_fooReturnArgX141 = LP$cloneX2$clone(
                      $,
                      fooCalleeParamX11249,
                      $,
                      fooCalleeParamX11250,
                      fooCalleeParamX11251,
                      fooCalleeParamX11252,
                      fooCalleeParamX11253,
                      KA,
                      fooCalleeParamX11254,
                    );
                    return SSA_fooReturnArgX141;
                  } else {
                    const fooIfTestX13142 = fooSwitchCaseToStartX352 <= 6;
                    if (fooIfTestX13142) {
                      const fooCalleeParamX11255 = SSA_bNeX94;
                      const fooCalleeParamX11256 = SSA_xNeX108;
                      const fooCalleeParamX11257 = SSA_SNeX76[4];
                      const fooCalleeParamX11258 = SSA_SNeX76[2];
                      const fooCalleeParamX11259 = SSA_SNeX76[3];
                      const fooCalleeParamX11260 = SSA_SNeX76[1];
                      const SSA_fooReturnArgX142 = LP$cloneX2$clone(
                        $,
                        fooCalleeParamX11255,
                        $,
                        fooCalleeParamX11256,
                        fooCalleeParamX11257,
                        fooCalleeParamX11258,
                        fooCalleeParamX11259,
                        QA,
                        fooCalleeParamX11260,
                      );
                      return SSA_fooReturnArgX142;
                    } else {
                      const fooIfTestX13143 = fooSwitchCaseToStartX352 <= 7;
                      if (fooIfTestX13143) {
                        const fooCalleeParamX11261 = SSA_bNeX94;
                        const fooCalleeParamX11262 = SSA_xNeX108;
                        const fooCalleeParamX11263 = SSA_SNeX76[4];
                        const fooCalleeParamX11264 = SSA_SNeX76[2];
                        const fooCalleeParamX11265 = SSA_SNeX76[3];
                        const fooCalleeParamX11266 = SSA_SNeX76[1];
                        const SSA_fooReturnArgX143 = LP$cloneX2$clone(
                          $,
                          fooCalleeParamX11261,
                          $,
                          fooCalleeParamX11262,
                          fooCalleeParamX11263,
                          fooCalleeParamX11264,
                          fooCalleeParamX11265,
                          $A,
                          fooCalleeParamX11266,
                        );
                        return SSA_fooReturnArgX143;
                      } else {
                        const fooIfTestX13144 = fooSwitchCaseToStartX352 <= 8;
                        if (fooIfTestX13144) {
                          PNeX191 = SSA_SNeX76[4];
                          const NNeX135 = SSA_SNeX76[3];
                          const CNeX70 = SSA_SNeX76[2];
                          kNeX164 = SSA_SNeX76[1];
                          const fooBinBothRhsX4241 = typeof CNeX70;
                          const fooIfTestX13184 = `number` == fooBinBothRhsX4241;
                          if (fooIfTestX13184) {
                            const fooBinBothRhsX4244 = typeof NNeX135;
                            const fooIfTestX13187 = `number` == fooBinBothRhsX4244;
                            if (fooIfTestX13187) {
                              let fooReturnArgX5600 = undefined;
                              const fooIfTestX13188 = 0 === NNeX135;
                              if (fooIfTestX13188) {
                                fooReturnArgX5600 = function ($$0) {
                                  let nCeX402 = $$0;
                                  debugger;
                                  const fooCalleeParamX11267 = SSA_bNeX94;
                                  const fooArrElementX3215 = SSA_xNeX108;
                                  const fooArrElementX3217 = SP(kNeX164, zAe, nCeX402);
                                  const fooCalleeParamX11268 = [4, fooArrElementX3215, fooArrElementX3217];
                                  const fooCalleeParamX11269 = PNeX191;
                                  const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, PNeX191);
                                  return fooReturnArgX5601;
                                };
                                return fooReturnArgX5600;
                              } else {
                                fooReturnArgX5600 = function ($$0, $$1) {
                                  let nCeX403 = $$0;
                                  let rCeX214 = $$1;
                                  debugger;
                                  const fooCalleeParamX11270 = SSA_bNeX94;
                                  const fooArrElementX3219 = SSA_xNeX108;
                                  const fooArrElementX3221 = SP(kNeX164, nCeX403, rCeX214);
                                  const fooCalleeParamX11271 = [4, fooArrElementX3219, fooArrElementX3221];
                                  const fooCalleeParamX11272 = PNeX191;
                                  const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, PNeX191);
                                  return fooReturnArgX5602;
                                };
                                return fooReturnArgX5600;
                              }
                            } else {
                              vNeX134 = NNeX135[1];
                              const fooReturnArgX5599 = function ($$0) {
                                let nCeX404 = $$0;
                                debugger;
                                const fooCalleeParamX11273 = SSA_bNeX94;
                                const fooArrElementX3223 = SSA_xNeX108;
                                const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
                                const fooCalleeParamX11274 = [4, fooArrElementX3223, fooArrElementX3225];
                                const fooCalleeParamX11275 = PNeX191;
                                const fooReturnArgX5603 = RP$cloneX5(fooCalleeParamX11273, $, fooCalleeParamX11274, PNeX191);
                                return fooReturnArgX5603;
                              };
                              return fooReturnArgX5599;
                            }
                          } else {
                            const fooBinBothRhsX4242 = CNeX70[0];
                            const fooIfTestX13185 = 0 === fooBinBothRhsX4242;
                            if (fooIfTestX13185) {
                              wNeX70 = CNeX70[2];
                              LNeX86 = CNeX70[1];
                              const fooBinBothRhsX4245 = typeof NNeX135;
                              const fooIfTestX13189 = `number` == fooBinBothRhsX4245;
                              if (fooIfTestX13189) {
                                let fooReturnArgX5605 = undefined;
                                const fooIfTestX13190 = 0 === NNeX135;
                                if (fooIfTestX13190) {
                                  fooReturnArgX5605 = function ($$0) {
                                    let nCeX405 = $$0;
                                    debugger;
                                    const fooCalleeParamX11276 = SSA_bNeX94;
                                    const fooArrElementX3227 = SSA_xNeX108;
                                    const fooCalleeParamX11277 = LNeX86;
                                    const fooCalleeParamX11278 = wNeX70;
                                    const fooCalleeParamX11279 = SP(kNeX164, zAe, nCeX405);
                                    const fooArrElementX3229 = UA(fooCalleeParamX11277, fooCalleeParamX11278, fooCalleeParamX11279);
                                    const fooCalleeParamX11280 = [4, fooArrElementX3227, fooArrElementX3229];
                                    const fooCalleeParamX11281 = PNeX191;
                                    const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, PNeX191);
                                    return fooReturnArgX5606;
                                  };
                                  return fooReturnArgX5605;
                                } else {
                                  fooReturnArgX5605 = function ($$0, $$1) {
                                    let nCeX406 = $$0;
                                    let rCeX215 = $$1;
                                    debugger;
                                    const fooCalleeParamX11282 = SSA_bNeX94;
                                    const fooArrElementX3232 = SSA_xNeX108;
                                    const fooCalleeParamX11283 = LNeX86;
                                    const fooCalleeParamX11284 = wNeX70;
                                    const fooCalleeParamX11285 = SP(kNeX164, nCeX406, rCeX215);
                                    const fooArrElementX3234 = UA(fooCalleeParamX11283, fooCalleeParamX11284, fooCalleeParamX11285);
                                    const fooCalleeParamX11286 = [4, fooArrElementX3232, fooArrElementX3234];
                                    const fooCalleeParamX11287 = PNeX191;
                                    const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, PNeX191);
                                    return fooReturnArgX5607;
                                  };
                                  return fooReturnArgX5605;
                                }
                              } else {
                                INeX72 = NNeX135[1];
                                const fooReturnArgX5604 = function ($$0) {
                                  let nCeX407 = $$0;
                                  debugger;
                                  const fooCalleeParamX11288 = SSA_bNeX94;
                                  const fooArrElementX3237 = SSA_xNeX108;
                                  const fooCalleeParamX11289 = LNeX86;
                                  const fooCalleeParamX11290 = wNeX70;
                                  const fooCalleeParamX11291 = SP(kNeX164, INeX72, nCeX407);
                                  const fooArrElementX3239 = UA(fooCalleeParamX11289, fooCalleeParamX11290, fooCalleeParamX11291);
                                  const fooCalleeParamX11292 = [4, fooArrElementX3237, fooArrElementX3239];
                                  const fooCalleeParamX11293 = PNeX191;
                                  const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, PNeX191);
                                  return fooReturnArgX5608;
                                };
                                return fooReturnArgX5604;
                              }
                            } else {
                              jNeX68 = CNeX70[1];
                              const fooBinBothRhsX4243 = typeof NNeX135;
                              const fooIfTestX13186 = `number` == fooBinBothRhsX4243;
                              if (fooIfTestX13186) {
                                let fooReturnArgX5609 = undefined;
                                const fooIfTestX13191 = 0 === NNeX135;
                                if (fooIfTestX13191) {
                                  fooReturnArgX5609 = function ($$0, $$1) {
                                    let nCeX408 = $$0;
                                    let rCeX216 = $$1;
                                    debugger;
                                    const fooCalleeParamX11294 = SSA_bNeX94;
                                    const fooArrElementX3242 = SSA_xNeX108;
                                    const fooCalleeParamX11295 = jNeX68;
                                    const fooCalleeParamX11296 = SP(kNeX164, zAe, rCeX216);
                                    const fooArrElementX3244 = UA(fooCalleeParamX11295, nCeX408, fooCalleeParamX11296);
                                    const fooCalleeParamX11297 = [4, fooArrElementX3242, fooArrElementX3244];
                                    const fooCalleeParamX11298 = PNeX191;
                                    const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, PNeX191);
                                    return fooReturnArgX5610;
                                  };
                                  return fooReturnArgX5609;
                                } else {
                                  fooReturnArgX5609 = function ($$0, $$1, $$2) {
                                    let nCeX409 = $$0;
                                    let rCeX217 = $$1;
                                    let sCeX129 = $$2;
                                    debugger;
                                    const fooCalleeParamX11299 = SSA_bNeX94;
                                    const fooArrElementX3247 = SSA_xNeX108;
                                    const fooCalleeParamX11300 = jNeX68;
                                    const fooCalleeParamX11301 = SP(kNeX164, rCeX217, sCeX129);
                                    const fooArrElementX3249 = UA(fooCalleeParamX11300, nCeX409, fooCalleeParamX11301);
                                    const fooCalleeParamX11302 = [4, fooArrElementX3247, fooArrElementX3249];
                                    const fooCalleeParamX11303 = PNeX191;
                                    const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, PNeX191);
                                    return fooReturnArgX5611;
                                  };
                                  return fooReturnArgX5609;
                                }
                              } else {
                                RNeX72 = NNeX135[1];
                                const fooReturnArgX5598 = function ($$0, $$1) {
                                  let nCeX410 = $$0;
                                  let rCeX218 = $$1;
                                  debugger;
                                  const fooCalleeParamX11304 = SSA_bNeX94;
                                  const fooArrElementX3252 = SSA_xNeX108;
                                  const fooCalleeParamX11305 = jNeX68;
                                  const fooCalleeParamX11306 = SP(kNeX164, RNeX72, rCeX218);
                                  const fooArrElementX3254 = UA(fooCalleeParamX11305, nCeX410, fooCalleeParamX11306);
                                  const fooCalleeParamX11307 = [4, fooArrElementX3252, fooArrElementX3254];
                                  const fooCalleeParamX11308 = PNeX191;
                                  const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, PNeX191);
                                  return fooReturnArgX5612;
                                };
                                return fooReturnArgX5598;
                              }
                            }
                          }
                        } else {
                          const fooIfTestX13145 = fooSwitchCaseToStartX352 <= 9;
                          if (fooIfTestX13145) {
                            DNeX65 = SSA_SNeX76[1];
                            const fooReturnArgX5613 = function ($$0) {
                              let nCeX411 = $$0;
                              debugger;
                              let rCeX219 = undefined;
                              if (nCeX411) {
                                rCeX219 = TU;
                              } else {
                                rCeX219 = _U;
                              }
                              const fooCalleeParamX11309 = SSA_bNeX94;
                              const fooCalleeParamX11310 = [4, SSA_xNeX108, rCeX219];
                              const fooCalleeParamX11311 = DNeX65;
                              const fooReturnArgX5614 = RP$cloneX5(fooCalleeParamX11309, $, fooCalleeParamX11310, DNeX65);
                              return fooReturnArgX5614;
                            };
                            return fooReturnArgX5613;
                          } else {
                            const fooIfTestX13146 = fooSwitchCaseToStartX352 <= 10;
                            if (fooIfTestX13146) {
                              SSA_xNeX108 = [7, SSA_xNeX108];
                              SSA_SNeX76 = SSA_SNeX76[1];
                              break $continue;
                            } else {
                              const fooIfTestX13147 = fooSwitchCaseToStartX352 <= 11;
                              if (fooIfTestX13147) {
                                const fooArrElementX3257 = SSA_xNeX108;
                                const fooArrElementX3259 = SSA_SNeX76[1];
                                SSA_xNeX108 = [2, fooArrElementX3257, fooArrElementX3259];
                                SSA_SNeX76 = SSA_SNeX76[2];
                                break $continue;
                              } else {
                                const fooIfTestX13148 = fooSwitchCaseToStartX352 <= 12;
                                if (fooIfTestX13148) {
                                  const fooArrElementX3262 = SSA_xNeX108;
                                  const fooArrElementX3264 = SSA_SNeX76[1];
                                  SSA_xNeX108 = [3, fooArrElementX3262, fooArrElementX3264];
                                  SSA_SNeX76 = SSA_SNeX76[2];
                                  break $continue;
                                } else {
                                  const fooIfTestX13149 = fooSwitchCaseToStartX352 <= 13;
                                  if (fooIfTestX13149) {
                                    MNeX63 = SSA_SNeX76[3];
                                    const ONeX61 = SSA_SNeX76[2];
                                    const YNeX58 = Q_$clone($);
                                    _A(YNeX58, ONeX61);
                                    FNeX55 = TA(YNeX58);
                                    const fooReturnArgX5615 = function () {
                                      debugger;
                                      const fooCalleeParamX11312 = SSA_bNeX94;
                                      const fooCalleeParamX11313 = [4, SSA_xNeX108, FNeX55];
                                      const fooCalleeParamX11314 = MNeX63;
                                      const fooReturnArgX5616 = RP$cloneX5(fooCalleeParamX11312, $, fooCalleeParamX11313, MNeX63);
                                      return fooReturnArgX5616;
                                    };
                                    return fooReturnArgX5615;
                                  } else {
                                    const fooIfTestX13150 = fooSwitchCaseToStartX352 <= 14;
                                    if (fooIfTestX13150) {
                                      VNeX53 = SSA_SNeX76[3];
                                      BNeX51 = SSA_SNeX76[2];
                                      const fooReturnArgX5617 = function ($$0) {
                                        let nCeX412 = $$0;
                                        debugger;
                                        const rCeX220 = nCeX412[1];
                                        const fooCalleeParamX11315 = PA(BNeX51);
                                        const fooCalleeParamX11316 = WE(fooCalleeParamX11315);
                                        const sCeX130 = YA(rCeX220, fooCalleeParamX11316);
                                        const fooUnaryArgX395 = sCeX130[2];
                                        const fooBinBothRhsX4246 = typeof fooUnaryArgX395;
                                        const fooIfTestX13192 = `number` == fooBinBothRhsX4246;
                                        if (fooIfTestX13192) {
                                          const fooCalleeParamX11317 = SSA_bNeX94;
                                          const fooCalleeParamX11318 = SSA_xNeX108;
                                          const fooCalleeParamX11319 = sCeX130[1];
                                          const fooCalleeParamX11320 = VNeX53;
                                          const fooCalleeParamX11321 = ZE(fooCalleeParamX11319, VNeX53);
                                          const fooReturnArgX5618 = RP$cloneX5(
                                            fooCalleeParamX11317,
                                            $,
                                            fooCalleeParamX11318,
                                            fooCalleeParamX11321,
                                          );
                                          return fooReturnArgX5618;
                                        } else {
                                          throw JAe;
                                        }
                                      };
                                      return fooReturnArgX5617;
                                    } else {
                                      const fooIfTestX13151 = fooSwitchCaseToStartX352 <= 15;
                                      if (fooIfTestX13151) {
                                        UNeX80 = SSA_SNeX76[1];
                                        const fooReturnArgX5619 = function ($$0, $$1) {
                                          let nCeX413 = $$0;
                                          let rCeX221 = $$1;
                                          debugger;
                                          const fooCalleeParamX11322 = SSA_bNeX94;
                                          const fooArrElementX3267 = SSA_xNeX108;
                                          const fooArrElementX3269 = function ($$0) {
                                            let sCeX131 = $$0;
                                            debugger;
                                            const fooReturnArgX5621 = YE(nCeX413, sCeX131, rCeX221);
                                            return fooReturnArgX5621;
                                          };
                                          const fooCalleeParamX11323 = [6, fooArrElementX3267, fooArrElementX3269];
                                          const fooCalleeParamX11324 = UNeX80;
                                          const fooReturnArgX5620 = RP$cloneX5(fooCalleeParamX11322, $, fooCalleeParamX11323, UNeX80);
                                          return fooReturnArgX5620;
                                        };
                                        return fooReturnArgX5619;
                                      } else {
                                        const fooIfTestX13152 = fooSwitchCaseToStartX352 <= 16;
                                        if (fooIfTestX13152) {
                                          XNeX77 = SSA_SNeX76[1];
                                          const fooReturnArgX5622 = function ($$0) {
                                            let nCeX414 = $$0;
                                            debugger;
                                            const fooCalleeParamX11325 = SSA_bNeX94;
                                            const fooCalleeParamX11326 = [6, SSA_xNeX108, nCeX414];
                                            const fooCalleeParamX11327 = XNeX77;
                                            const fooReturnArgX5623 = RP$cloneX5(fooCalleeParamX11325, $, fooCalleeParamX11326, XNeX77);
                                            return fooReturnArgX5623;
                                          };
                                          return fooReturnArgX5622;
                                        } else {
                                          const fooIfTestX13153 = fooSwitchCaseToStartX352 <= 17;
                                          if (fooIfTestX13153) {
                                            const fooArrElementX3272 = SSA_xNeX108;
                                            const fooArrElementX3274 = SSA_SNeX76[1];
                                            SSA_xNeX108 = [0, fooArrElementX3272, fooArrElementX3274];
                                            SSA_SNeX76 = SSA_SNeX76[2];
                                            break $continue;
                                          } else {
                                            const fooIfTestX13154 = fooSwitchCaseToStartX352 <= 18;
                                            if (fooIfTestX13154) {
                                              const WNeX66 = SSA_SNeX76[1];
                                              const fooBinBothRhsX4247 = WNeX66[0];
                                              const fooIfTestX13193 = 0 === fooBinBothRhsX4247;
                                              if (fooIfTestX13193) {
                                                const qNeX60 = SSA_SNeX76[2];
                                                const fooAssignRhsPropX413 = WNeX66[1];
                                                const GNeX69 = fooAssignRhsPropX413[1];
                                                const fooCallCalleeX105 = function ($$0, $$1, $$2) {
                                                  let nCeX415 = $$0;
                                                  let rCeX222 = $$1;
                                                  let sCeX132 = $$2;
                                                  debugger;
                                                  const fooReturnArgX5624 = function ($$0, $$1) {
                                                    let iCeX154 = $$0;
                                                    let oCeX143 = $$1;
                                                    debugger;
                                                    const fooArrElementX3277 = [0, oCeX143];
                                                    const fooCalleeParamX11328 = [1, nCeX415, fooArrElementX3277];
                                                    const fooReturnArgX5625 = RP(rCeX222, iCeX154, fooCalleeParamX11328, sCeX132);
                                                    return fooReturnArgX5625;
                                                  };
                                                  return fooReturnArgX5624;
                                                };
                                                SSA_bNeX94 = fooCallCalleeX105(SSA_xNeX108, SSA_bNeX94, qNeX60);
                                                SSA_xNeX108 = 0;
                                                SSA_SNeX76 = GNeX69;
                                                break $continue;
                                              } else {
                                                const zNeX57 = SSA_SNeX76[2];
                                                const fooAssignRhsPropX412 = WNeX66[1];
                                                const JNeX53 = fooAssignRhsPropX412[1];
                                                const fooCallCalleeX102 = function ($$0, $$1, $$2) {
                                                  let nCeX416 = $$0;
                                                  let rCeX223 = $$1;
                                                  let sCeX133 = $$2;
                                                  debugger;
                                                  const fooReturnArgX5626 = function ($$0, $$1) {
                                                    let iCeX155 = $$0;
                                                    let oCeX144 = $$1;
                                                    debugger;
                                                    const fooArrElementX3279 = [1, oCeX144];
                                                    const fooCalleeParamX11329 = [1, nCeX416, fooArrElementX3279];
                                                    const fooReturnArgX5627 = RP(rCeX223, iCeX155, fooCalleeParamX11329, sCeX133);
                                                    return fooReturnArgX5627;
                                                  };
                                                  return fooReturnArgX5626;
                                                };
                                                SSA_bNeX94 = fooCallCalleeX102(SSA_xNeX108, SSA_bNeX94, zNeX57);
                                                SSA_xNeX108 = 0;
                                                SSA_SNeX76 = JNeX53;
                                                break $continue;
                                              }
                                            } else {
                                              const fooIfTestX13155 = fooSwitchCaseToStartX352 <= 19;
                                              if (fooIfTestX13155) {
                                                const fooThrowArgX300 = [0, WB, Rq];
                                                throw fooThrowArgX300;
                                              } else {
                                                const fooIfTestX13156 = fooSwitchCaseToStartX352 <= 20;
                                                if (fooIfTestX13156) {
                                                  HNeX48 = SSA_SNeX76[3];
                                                  ZNeX45 = [8, SSA_xNeX108, Mq];
                                                  const fooReturnArgX5628 = function () {
                                                    debugger;
                                                    const fooReturnArgX5629 = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
                                                    return fooReturnArgX5629;
                                                  };
                                                  return fooReturnArgX5628;
                                                } else {
                                                  const fooIfTestX13157 = fooSwitchCaseToStartX352 <= 21;
                                                  if (fooIfTestX13157) {
                                                    KNeX38 = SSA_SNeX76[2];
                                                    const fooReturnArgX5630 = function ($$0) {
                                                      let nCeX417 = $$0;
                                                      debugger;
                                                      const fooCalleeParamX11330 = SSA_bNeX94;
                                                      const fooArrElementX3282 = SSA_xNeX108;
                                                      const fooArrElementX3284 = $yX2(Iq, nCeX417);
                                                      const fooCalleeParamX11331 = [4, fooArrElementX3282, fooArrElementX3284];
                                                      const fooCalleeParamX11332 = KNeX38;
                                                      const fooReturnArgX5631 = RP$cloneX5(
                                                        fooCalleeParamX11330,
                                                        $,
                                                        fooCalleeParamX11331,
                                                        KNeX38,
                                                      );
                                                      return fooReturnArgX5631;
                                                    };
                                                    return fooReturnArgX5630;
                                                  } else {
                                                    const fooIfTestX13158 = fooSwitchCaseToStartX352 <= 22;
                                                    if (fooIfTestX13158) {
                                                      QNeX102 = SSA_SNeX76[1];
                                                      const fooReturnArgX5632 = function ($$0) {
                                                        let nCeX418 = $$0;
                                                        debugger;
                                                        const fooCalleeParamX11333 = SSA_bNeX94;
                                                        const fooCalleeParamX11334 = [5, SSA_xNeX108, nCeX418];
                                                        const fooCalleeParamX11335 = QNeX102;
                                                        const fooReturnArgX5633 = RP$cloneX5(
                                                          fooCalleeParamX11333,
                                                          $,
                                                          fooCalleeParamX11334,
                                                          QNeX102,
                                                        );
                                                        return fooReturnArgX5633;
                                                      };
                                                      return fooReturnArgX5632;
                                                    } else {
                                                      const fooIfTestX13159 = fooSwitchCaseToStartX352 <= 23;
                                                      if (fooIfTestX13159) {
                                                        const $NeX101 = SSA_SNeX76[2];
                                                        const eCeX71 = SSA_SNeX76[1];
                                                        const fooBinBothRhsX4248 = typeof eCeX71;
                                                        const fooIfTestX13194 = `number` == fooBinBothRhsX4248;
                                                        if (fooIfTestX13194) {
                                                          let fooSwitchCaseToStartX353 = 4;
                                                          const fooIfTestX13195 = 0 === eCeX71;
                                                          if (fooIfTestX13195) {
                                                            fooSwitchCaseToStartX353 = 0;
                                                          } else {
                                                            const fooIfTestX13201 = 1 === eCeX71;
                                                            if (fooIfTestX13201) {
                                                              fooSwitchCaseToStartX353 = 1;
                                                            } else {
                                                              const fooIfTestX13202 = 2 === eCeX71;
                                                              if (fooIfTestX13202) {
                                                                fooSwitchCaseToStartX353 = 2;
                                                              } else {
                                                                const fooIfTestX13203 = 3 === eCeX71;
                                                                if (fooIfTestX13203) {
                                                                  fooSwitchCaseToStartX353 = 3;
                                                                } else {
                                                                }
                                                              }
                                                            }
                                                          }
                                                          const fooIfTestX13196 = fooSwitchCaseToStartX353 <= 0;
                                                          if (fooIfTestX13196) {
                                                            const fooCalleeParamX11336 = SSA_bNeX94;
                                                            const fooCalleeParamX11337 = SSA_xNeX108;
                                                            const SSA_fooReturnArgX144 = PP$cloneX3$clone(
                                                              $,
                                                              fooCalleeParamX11336,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX144;
                                                          } else {
                                                            const fooIfTestX13197 = fooSwitchCaseToStartX353 <= 1;
                                                            if (fooIfTestX13197) {
                                                              const fooCalleeParamX11338 = SSA_bNeX94;
                                                              const fooCalleeParamX11339 = SSA_xNeX108;
                                                              const SSA_fooReturnArgX145 = PP$cloneX3$clone(
                                                                $,
                                                                fooCalleeParamX11338,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX145;
                                                            } else {
                                                              const fooIfTestX13198 = fooSwitchCaseToStartX353 <= 2;
                                                              if (fooIfTestX13198) {
                                                                const fooCalleeParamX11340 = SSA_bNeX94;
                                                                const fooCalleeParamX11341 = SSA_xNeX108;
                                                                const SSA_fooReturnArgX146 = PP$cloneX3$clone(
                                                                  $,
                                                                  fooCalleeParamX11340,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX146;
                                                              } else {
                                                                const fooIfTestX13199 = fooSwitchCaseToStartX353 <= 3;
                                                                if (fooIfTestX13199) {
                                                                  const fooThrowArgX301 = [0, WB, Oq];
                                                                  throw fooThrowArgX301;
                                                                } else {
                                                                  const fooIfTestX13200 = fooSwitchCaseToStartX353 <= 4;
                                                                  if (fooIfTestX13200) {
                                                                    const fooCalleeParamX11342 = SSA_bNeX94;
                                                                    const fooCalleeParamX11343 = SSA_xNeX108;
                                                                    const SSA_fooReturnArgX147 = PP$cloneX3$clone(
                                                                      $,
                                                                      fooCalleeParamX11342,
                                                                      $,
                                                                      SSA_xNeX108,
                                                                      $NeX101,
                                                                    );
                                                                    return SSA_fooReturnArgX147;
                                                                  } else {
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        } else {
                                                          const fooSwitchTestX187 = eCeX71[0];
                                                          let fooSwitchCaseToStartX354 = 10;
                                                          const fooIfTestX13204 = 0 === fooSwitchTestX187;
                                                          if (fooIfTestX13204) {
                                                            fooSwitchCaseToStartX354 = 0;
                                                          } else {
                                                            const fooIfTestX13216 = 1 === fooSwitchTestX187;
                                                            if (fooIfTestX13216) {
                                                              fooSwitchCaseToStartX354 = 1;
                                                            } else {
                                                              const fooIfTestX13217 = 2 === fooSwitchTestX187;
                                                              if (fooIfTestX13217) {
                                                                fooSwitchCaseToStartX354 = 2;
                                                              } else {
                                                                const fooIfTestX13218 = 3 === fooSwitchTestX187;
                                                                if (fooIfTestX13218) {
                                                                  fooSwitchCaseToStartX354 = 3;
                                                                } else {
                                                                  const fooIfTestX13219 = 4 === fooSwitchTestX187;
                                                                  if (fooIfTestX13219) {
                                                                    fooSwitchCaseToStartX354 = 4;
                                                                  } else {
                                                                    const fooIfTestX13220 = 5 === fooSwitchTestX187;
                                                                    if (fooIfTestX13220) {
                                                                      fooSwitchCaseToStartX354 = 5;
                                                                    } else {
                                                                      const fooIfTestX13221 = 6 === fooSwitchTestX187;
                                                                      if (fooIfTestX13221) {
                                                                        fooSwitchCaseToStartX354 = 6;
                                                                      } else {
                                                                        const fooIfTestX13222 = 7 === fooSwitchTestX187;
                                                                        if (fooIfTestX13222) {
                                                                          fooSwitchCaseToStartX354 = 7;
                                                                        } else {
                                                                          const fooIfTestX13223 = 8 === fooSwitchTestX187;
                                                                          if (fooIfTestX13223) {
                                                                            fooSwitchCaseToStartX354 = 8;
                                                                          } else {
                                                                            const fooIfTestX13224 = 9 === fooSwitchTestX187;
                                                                            if (fooIfTestX13224) {
                                                                              fooSwitchCaseToStartX354 = 9;
                                                                            } else {
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                          const fooIfTestX13205 = fooSwitchCaseToStartX354 <= 0;
                                                          if (fooIfTestX13205) {
                                                            const fooCalleeParamX11344 = SSA_bNeX94;
                                                            const fooCalleeParamX11345 = SSA_xNeX108;
                                                            const SSA_fooReturnArgX148 = PP$cloneX3$clone(
                                                              $,
                                                              fooCalleeParamX11344,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX148;
                                                          } else {
                                                            const fooIfTestX13206 = fooSwitchCaseToStartX354 <= 1;
                                                            if (fooIfTestX13206) {
                                                              const fooCalleeParamX11346 = SSA_bNeX94;
                                                              const fooCalleeParamX11347 = SSA_xNeX108;
                                                              const SSA_fooReturnArgX149 = PP$cloneX3$clone(
                                                                $,
                                                                fooCalleeParamX11346,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX149;
                                                            } else {
                                                              const fooIfTestX13207 = fooSwitchCaseToStartX354 <= 2;
                                                              if (fooIfTestX13207) {
                                                                const fooCalleeParamX11348 = SSA_bNeX94;
                                                                const fooCalleeParamX11349 = SSA_xNeX108;
                                                                const SSA_fooReturnArgX150 = PP$cloneX3$clone(
                                                                  $,
                                                                  fooCalleeParamX11348,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX150;
                                                              } else {
                                                                const fooIfTestX13208 = fooSwitchCaseToStartX354 <= 3;
                                                                if (fooIfTestX13208) {
                                                                  const fooCalleeParamX11350 = SSA_bNeX94;
                                                                  const fooCalleeParamX11351 = SSA_xNeX108;
                                                                  const SSA_fooReturnArgX151 = PP$cloneX3$clone(
                                                                    $,
                                                                    fooCalleeParamX11350,
                                                                    $,
                                                                    SSA_xNeX108,
                                                                    $NeX101,
                                                                  );
                                                                  return SSA_fooReturnArgX151;
                                                                } else {
                                                                  const fooIfTestX13209 = fooSwitchCaseToStartX354 <= 4;
                                                                  if (fooIfTestX13209) {
                                                                    const fooCalleeParamX11352 = SSA_bNeX94;
                                                                    const fooCalleeParamX11353 = SSA_xNeX108;
                                                                    const SSA_fooReturnArgX152 = PP$cloneX3$clone(
                                                                      $,
                                                                      fooCalleeParamX11352,
                                                                      $,
                                                                      SSA_xNeX108,
                                                                      $NeX101,
                                                                    );
                                                                    return SSA_fooReturnArgX152;
                                                                  } else {
                                                                    const fooIfTestX13210 = fooSwitchCaseToStartX354 <= 5;
                                                                    if (fooIfTestX13210) {
                                                                      const fooCalleeParamX11354 = SSA_bNeX94;
                                                                      const fooCalleeParamX11355 = SSA_xNeX108;
                                                                      const SSA_fooReturnArgX153 = PP$cloneX3$clone(
                                                                        $,
                                                                        fooCalleeParamX11354,
                                                                        $,
                                                                        SSA_xNeX108,
                                                                        $NeX101,
                                                                      );
                                                                      return SSA_fooReturnArgX153;
                                                                    } else {
                                                                      const fooIfTestX13211 = fooSwitchCaseToStartX354 <= 6;
                                                                      if (fooIfTestX13211) {
                                                                        const fooCalleeParamX11356 = SSA_bNeX94;
                                                                        const fooCalleeParamX11357 = SSA_xNeX108;
                                                                        const SSA_fooReturnArgX154 = PP$cloneX3$clone(
                                                                          $,
                                                                          fooCalleeParamX11356,
                                                                          $,
                                                                          SSA_xNeX108,
                                                                          $NeX101,
                                                                        );
                                                                        return SSA_fooReturnArgX154;
                                                                      } else {
                                                                        const fooIfTestX13212 = fooSwitchCaseToStartX354 <= 7;
                                                                        if (fooIfTestX13212) {
                                                                          const fooCalleeParamX11358 = SSA_bNeX94;
                                                                          const fooCalleeParamX11359 = SSA_xNeX108;
                                                                          const SSA_fooReturnArgX155 = PP$cloneX3$clone(
                                                                            $,
                                                                            fooCalleeParamX11358,
                                                                            $,
                                                                            SSA_xNeX108,
                                                                            $NeX101,
                                                                          );
                                                                          return SSA_fooReturnArgX155;
                                                                        } else {
                                                                          const fooIfTestX13213 = fooSwitchCaseToStartX354 <= 8;
                                                                          if (fooIfTestX13213) {
                                                                            const fooCalleeParamX11360 = SSA_bNeX94;
                                                                            const fooCalleeParamX11361 = SSA_xNeX108;
                                                                            const fooCalleeParamX11362 = eCeX71[2];
                                                                            const SSA_fooReturnArgX156 = _P$cloneX4$clone(
                                                                              $,
                                                                              fooCalleeParamX11360,
                                                                              $,
                                                                              fooCalleeParamX11361,
                                                                              fooCalleeParamX11362,
                                                                              $NeX101,
                                                                            );
                                                                            return SSA_fooReturnArgX156;
                                                                          } else {
                                                                            const fooIfTestX13214 = fooSwitchCaseToStartX354 <= 9;
                                                                            if (fooIfTestX13214) {
                                                                              const fooCalleeParamX11363 = SSA_bNeX94;
                                                                              const fooCalleeParamX11364 = SSA_xNeX108;
                                                                              const SSA_fooReturnArgX157 = PP$cloneX3$clone(
                                                                                $,
                                                                                fooCalleeParamX11363,
                                                                                $,
                                                                                SSA_xNeX108,
                                                                                $NeX101,
                                                                              );
                                                                              return SSA_fooReturnArgX157;
                                                                            } else {
                                                                              const fooIfTestX13215 = fooSwitchCaseToStartX354 <= 10;
                                                                              if (fooIfTestX13215) {
                                                                                const fooCalleeParamX11365 = SSA_bNeX94;
                                                                                const fooCalleeParamX11366 = SSA_xNeX108;
                                                                                const SSA_fooReturnArgX158 = PP$cloneX3$clone(
                                                                                  $,
                                                                                  fooCalleeParamX11365,
                                                                                  $,
                                                                                  SSA_xNeX108,
                                                                                  $NeX101,
                                                                                );
                                                                                return SSA_fooReturnArgX158;
                                                                              } else {
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      } else {
                                                      }
                                                      const fooIfTestX13160 = fooSwitchCaseToStartX352 <= 24;
                                                      if (fooIfTestX13160) {
                                                        const tCeX65 = SSA_SNeX76[3];
                                                        const aCeX130 = SSA_SNeX76[1];
                                                        const fooCalleeParamX11367 = SSA_bNeX94;
                                                        const fooCalleeParamX11368 = SSA_xNeX108;
                                                        const fooCalleeParamX11369 = SSA_SNeX76[2];
                                                        const fooCalleeParamX11370 = OE$clone(fooCalleeParamX11369, $);
                                                        const SSA_fooReturnArgX159 = IP$cloneX3$cloneX1(
                                                          $,
                                                          fooCalleeParamX11367,
                                                          $,
                                                          fooCalleeParamX11368,
                                                          tCeX65,
                                                          aCeX130,
                                                          fooCalleeParamX11370,
                                                        );
                                                        return SSA_fooReturnArgX159;
                                                      } else {
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return undefined;
};
$(TP$cloneX2$cloneX1);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement
- (todo) support array reads statement type ThrowStatement
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


BAD@! Found 37 implicit global bindings:

SP, UA, RP$cloneX5, zAe, $yX2, Iq, YE, PA, WE, YA, ZE, JAe, TU, _U, XT, __, Jq, YE$cloneX5, NP$cloneX2$clone, WA, LP$cloneX2$clone, ZA, KA, QA, $A, Q_$clone, _A, TA, RP, WB, Rq, Mq, PP$cloneX3$clone, Oq, _P$cloneX4$clone, OE$clone, IP$cloneX3$cloneX1


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
