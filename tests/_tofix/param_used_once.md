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
const fooCalleeParamX11238 /*:(unknown)=>unknown*/ = function ($$0) {
  const nCeX401 /*:unknown*/ = $$0;
  debugger;
  return nCeX401;
};
const TP$cloneX2$cloneX1 /*:(unused, unknown, unused, unknown, unknown)=>unknown*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const mNeX765 /*:unknown*/ = $$1;
  const gNeX352 /*:unknown*/ = $$3;
  const yNeX272 /*:unknown*/ = $$4;
  debugger;
  const fooReturnArgX5632 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX418 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11334 /*:array*/ = [5, SSA_xNeX108, nCeX418];
    const fooReturnArgX5633 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11334, QNeX102);
    return fooReturnArgX5633;
  };
  const fooReturnArgX5630 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX417 /*:unknown*/ = $$0;
    debugger;
    const fooArrElementX3284 /*:unknown*/ = $yX2(Iq, nCeX417);
    const fooCalleeParamX11331 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3284];
    const fooReturnArgX5631 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11331, KNeX38);
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
    const fooCalleeParamX11326 /*:array*/ = [6, SSA_xNeX108, nCeX414];
    const fooReturnArgX5623 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11326, XNeX77);
    return fooReturnArgX5623;
  };
  const fooReturnArgX5619 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX413 /*:unknown*/ = $$0;
    const rCeX221 /*:unknown*/ = $$1;
    debugger;
    const fooArrElementX3269 /*:(unknown)=>unknown*/ = function ($$0) {
      const sCeX131 /*:unknown*/ = $$0;
      debugger;
      const fooReturnArgX5621 /*:unknown*/ = YE(nCeX413, sCeX131, rCeX221);
      return fooReturnArgX5621;
    };
    const fooCalleeParamX11323 /*:array*/ = [6, SSA_xNeX108, fooArrElementX3269];
    const fooReturnArgX5620 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11323, UNeX80);
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
    const fooBinBothRhsX4246 /*:string*/ = typeof fooUnaryArgX395;
    const fooIfTestX13192 /*:boolean*/ = `number` == fooBinBothRhsX4246;
    if (fooIfTestX13192) {
      const fooCalleeParamX11319 /*:unknown*/ = sCeX130[1];
      const fooCalleeParamX11321 /*:unknown*/ = ZE(fooCalleeParamX11319, VNeX53);
      const fooReturnArgX5618 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, SSA_xNeX108, fooCalleeParamX11321);
      return fooReturnArgX5618;
    } else {
      throw JAe;
    }
  };
  const fooReturnArgX5615 /*:()=>unknown*/ = function () {
    debugger;
    const fooCalleeParamX11313 /*:array*/ = [4, SSA_xNeX108, FNeX55];
    const fooReturnArgX5616 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11313, MNeX63);
    return fooReturnArgX5616;
  };
  let DNeX65 /*:unknown*/ = undefined;
  const fooReturnArgX5613 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX411 /*:unknown*/ = $$0;
    debugger;
    let rCeX219 /*:unknown*/ = undefined;
    if (nCeX411) {
      rCeX219 = TU;
    } else {
      rCeX219 = _U;
    }
    const fooCalleeParamX11310 /*:array*/ = [4, SSA_xNeX108, rCeX219];
    const fooReturnArgX5614 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11310, DNeX65);
    return fooReturnArgX5614;
  };
  const fooReturnArgX5598 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX410 /*:unknown*/ = $$0;
    const rCeX218 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11306 /*:unknown*/ = SP(kNeX164, RNeX72, rCeX218);
    const fooArrElementX3254 /*:unknown*/ = UA(jNeX68, nCeX410, fooCalleeParamX11306);
    const fooCalleeParamX11307 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3254];
    const fooReturnArgX5612 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11307, PNeX191);
    return fooReturnArgX5612;
  };
  const tmpClusterSSA_fooReturnArgX5609$1 /*:(unknown, unknown, unknown)=>unknown*/ = function ($$0, $$1, $$2) {
    const nCeX409 /*:unknown*/ = $$0;
    const rCeX217 /*:unknown*/ = $$1;
    const sCeX129 /*:unknown*/ = $$2;
    debugger;
    const fooCalleeParamX11301 /*:unknown*/ = SP(kNeX164, rCeX217, sCeX129);
    const fooArrElementX3249 /*:unknown*/ = UA(jNeX68, nCeX409, fooCalleeParamX11301);
    const fooCalleeParamX11302 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3249];
    const fooReturnArgX5611 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11302, PNeX191);
    return fooReturnArgX5611;
  };
  const tmpClusterSSA_fooReturnArgX5609 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX408 /*:unknown*/ = $$0;
    const rCeX216 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11296 /*:unknown*/ = SP(kNeX164, zAe, rCeX216);
    const fooArrElementX3244 /*:unknown*/ = UA(jNeX68, nCeX408, fooCalleeParamX11296);
    const fooCalleeParamX11297 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3244];
    const fooReturnArgX5610 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11297, PNeX191);
    return fooReturnArgX5610;
  };
  const fooReturnArgX5604 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX407 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11291 /*:unknown*/ = SP(kNeX164, INeX72, nCeX407);
    const fooArrElementX3239 /*:unknown*/ = UA(LNeX86, wNeX70, fooCalleeParamX11291);
    const fooCalleeParamX11292 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3239];
    const fooReturnArgX5608 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11292, PNeX191);
    return fooReturnArgX5608;
  };
  const tmpClusterSSA_fooReturnArgX5605$1 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX406 /*:unknown*/ = $$0;
    const rCeX215 /*:unknown*/ = $$1;
    debugger;
    const fooCalleeParamX11285 /*:unknown*/ = SP(kNeX164, nCeX406, rCeX215);
    const fooArrElementX3234 /*:unknown*/ = UA(LNeX86, wNeX70, fooCalleeParamX11285);
    const fooCalleeParamX11286 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3234];
    const fooReturnArgX5607 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11286, PNeX191);
    return fooReturnArgX5607;
  };
  const tmpClusterSSA_fooReturnArgX5605 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX405 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11279 /*:unknown*/ = SP(kNeX164, zAe, nCeX405);
    const fooArrElementX3229 /*:unknown*/ = UA(LNeX86, wNeX70, fooCalleeParamX11279);
    const fooCalleeParamX11280 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3229];
    const fooReturnArgX5606 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11280, PNeX191);
    return fooReturnArgX5606;
  };
  const fooReturnArgX5599 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX404 /*:unknown*/ = $$0;
    debugger;
    const fooArrElementX3225 /*:unknown*/ = SP(kNeX164, vNeX134, nCeX404);
    const fooCalleeParamX11274 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3225];
    const fooReturnArgX5603 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11274, PNeX191);
    return fooReturnArgX5603;
  };
  const tmpClusterSSA_fooReturnArgX5600$1 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
    const nCeX403 /*:unknown*/ = $$0;
    const rCeX214 /*:unknown*/ = $$1;
    debugger;
    const fooArrElementX3221 /*:unknown*/ = SP(kNeX164, nCeX403, rCeX214);
    const fooCalleeParamX11271 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3221];
    const fooReturnArgX5602 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11271, PNeX191);
    return fooReturnArgX5602;
  };
  const tmpClusterSSA_fooReturnArgX5600 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX402 /*:unknown*/ = $$0;
    debugger;
    const fooArrElementX3217 /*:unknown*/ = SP(kNeX164, zAe, nCeX402);
    const fooCalleeParamX11268 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3217];
    const fooReturnArgX5601 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11268, PNeX191);
    return fooReturnArgX5601;
  };
  const fooReturnArgX5596 /*:(unknown)=>unknown*/ = function ($$0) {
    const nCeX400 /*:unknown*/ = $$0;
    debugger;
    const fooCalleeParamX11232 /*:unknown*/ = XT(nCeX400);
    const fooArrElementX3213 /*:unknown*/ = __(fooCalleeParamX11232, Jq);
    const fooCalleeParamX11234 /*:array*/ = [4, SSA_xNeX108, fooArrElementX3213];
    const fooReturnArgX5597 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11234, TNeX211);
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
    const fooCalleeParamX11229 /*:array*/ = [5, SSA_xNeX108, nCeX399];
    const fooReturnArgX5595 /*:unknown*/ = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11229, ENeX311);
    return fooReturnArgX5595;
  };
  let jNeX68 /*:unknown*/ = undefined;
  let kNeX164 /*:unknown*/ = undefined;
  let vNeX134 /*:unknown*/ = undefined;
  let wNeX70 /*:unknown*/ = undefined;
  let SSA_SNeX76 /*:unknown*/ = yNeX272;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const fooBinBothRhsX4240 /*:string*/ = typeof SSA_SNeX76;
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
                        const fooBinBothRhsX4241 /*:string*/ = typeof CNeX70;
                        const fooIfTestX13184 /*:boolean*/ = `number` == fooBinBothRhsX4241;
                        if (fooIfTestX13184) {
                          const fooBinBothRhsX4244 /*:string*/ = typeof NNeX135;
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
                            const fooBinBothRhsX4245 /*:string*/ = typeof NNeX135;
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
                            const fooBinBothRhsX4243 /*:string*/ = typeof NNeX135;
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
                                            const fooReturnArgX5626 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
                                              const iCeX155 /*:unknown*/ = $$0;
                                              const oCeX144 /*:unknown*/ = $$1;
                                              debugger;
                                              const fooArrElementX3279 /*:array*/ = [1, oCeX144];
                                              const fooCalleeParamX11329 /*:array*/ = [1, nCeX415, fooArrElementX3279];
                                              const fooReturnArgX5627 /*:unknown*/ = RP(rCeX222, iCeX155, fooCalleeParamX11329, qNeX60);
                                              return fooReturnArgX5627;
                                            };
                                            const fooReturnArgX5624 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
                                              const iCeX154 /*:unknown*/ = $$0;
                                              const oCeX143 /*:unknown*/ = $$1;
                                              debugger;
                                              const fooArrElementX3277 /*:array*/ = [0, oCeX143];
                                              const fooCalleeParamX11328 /*:array*/ = [1, nCeX415, fooArrElementX3277];
                                              const fooReturnArgX5625 /*:unknown*/ = RP(rCeX222, iCeX154, fooCalleeParamX11328, qNeX60);
                                              return fooReturnArgX5625;
                                            };
                                            const WNeX66 /*:unknown*/ = SSA_SNeX76[1];
                                            const fooBinBothRhsX4247 /*:unknown*/ = WNeX66[0];
                                            const qNeX60 /*:unknown*/ = SSA_SNeX76[2];
                                            const fooAssignRhsPropX413 /*:unknown*/ = WNeX66[1];
                                            const GNeX69 /*:unknown*/ = fooAssignRhsPropX413[1];
                                            const nCeX415 /*:unknown*/ = SSA_xNeX108;
                                            const rCeX222 /*:unknown*/ = SSA_bNeX94;
                                            const fooIfTestX13193 /*:boolean*/ = 0 === fooBinBothRhsX4247;
                                            if (fooIfTestX13193) {
                                              SSA_bNeX94 = fooReturnArgX5624;
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            } else {
                                              SSA_bNeX94 = fooReturnArgX5626;
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            }
                                          } else {
                                            const fooIfTestX13155 /*:boolean*/ = fooSwitchCaseToStartX352 <= 19;
                                            if (fooIfTestX13155) {
                                              const fooThrowArgX300 /*:array*/ = [0, WB, Rq];
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
                                                      const fooBinBothRhsX4248 /*:string*/ = typeof eCeX71;
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
                                                                const fooThrowArgX301 /*:array*/ = [0, WB, Oq];
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
const fooCalleeParamX11238 = function (nCeX401) {
  return nCeX401;
};
$(function ($$0, mNeX765, $$2, gNeX352, yNeX272) {
  const fooReturnArgX5632 = function (nCeX418) {
    const fooReturnArgX5633 = RP$cloneX5(SSA_bNeX94, $, [5, SSA_xNeX108, nCeX418], QNeX102);
    return fooReturnArgX5633;
  };
  const fooReturnArgX5630 = function (nCeX417) {
    const fooArrElementX3284 = $yX2(Iq, nCeX417);
    const fooReturnArgX5631 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3284], KNeX38);
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
    const fooArrElementX3269 = function (sCeX131) {
      const fooReturnArgX5621 = YE(nCeX413, sCeX131, rCeX221);
      return fooReturnArgX5621;
    };
    const fooReturnArgX5620 = RP$cloneX5(SSA_bNeX94, $, [6, SSA_xNeX108, fooArrElementX3269], UNeX80);
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
    const fooArrElementX3254 = UA(jNeX68, nCeX410, SP(kNeX164, RNeX72, rCeX218));
    const fooReturnArgX5612 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3254], PNeX191);
    return fooReturnArgX5612;
  };
  const tmpClusterSSA_fooReturnArgX5609$1 = function (nCeX409, rCeX217, sCeX129) {
    const fooArrElementX3249 = UA(jNeX68, nCeX409, SP(kNeX164, rCeX217, sCeX129));
    const fooReturnArgX5611 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3249], PNeX191);
    return fooReturnArgX5611;
  };
  const tmpClusterSSA_fooReturnArgX5609 = function (nCeX408, rCeX216) {
    const fooArrElementX3244 = UA(jNeX68, nCeX408, SP(kNeX164, zAe, rCeX216));
    const fooReturnArgX5610 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3244], PNeX191);
    return fooReturnArgX5610;
  };
  const fooReturnArgX5604 = function (nCeX407) {
    const fooArrElementX3239 = UA(LNeX86, wNeX70, SP(kNeX164, INeX72, nCeX407));
    const fooReturnArgX5608 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3239], PNeX191);
    return fooReturnArgX5608;
  };
  const tmpClusterSSA_fooReturnArgX5605$1 = function (nCeX406, rCeX215) {
    const fooArrElementX3234 = UA(LNeX86, wNeX70, SP(kNeX164, nCeX406, rCeX215));
    const fooReturnArgX5607 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3234], PNeX191);
    return fooReturnArgX5607;
  };
  const tmpClusterSSA_fooReturnArgX5605 = function (nCeX405) {
    const fooArrElementX3229 = UA(LNeX86, wNeX70, SP(kNeX164, zAe, nCeX405));
    const fooReturnArgX5606 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3229], PNeX191);
    return fooReturnArgX5606;
  };
  const fooReturnArgX5599 = function (nCeX404) {
    const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
    const fooReturnArgX5603 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3225], PNeX191);
    return fooReturnArgX5603;
  };
  const tmpClusterSSA_fooReturnArgX5600$1 = function (nCeX403, rCeX214) {
    const fooArrElementX3221 = SP(kNeX164, nCeX403, rCeX214);
    const fooReturnArgX5602 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3221], PNeX191);
    return fooReturnArgX5602;
  };
  const tmpClusterSSA_fooReturnArgX5600 = function (nCeX402) {
    const fooArrElementX3217 = SP(kNeX164, zAe, nCeX402);
    const fooReturnArgX5601 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3217], PNeX191);
    return fooReturnArgX5601;
  };
  const fooReturnArgX5596 = function (nCeX400) {
    const fooArrElementX3213 = __(XT(nCeX400), Jq);
    const fooReturnArgX5597 = RP$cloneX5(SSA_bNeX94, $, [4, SSA_xNeX108, fooArrElementX3213], TNeX211);
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
                                            const fooReturnArgX5626 = function (iCeX155, oCeX144) {
                                              const fooArrElementX3279 = [1, oCeX144];
                                              const fooReturnArgX5627 = RP(rCeX222, iCeX155, [1, nCeX415, fooArrElementX3279], qNeX60);
                                              return fooReturnArgX5627;
                                            };
                                            const fooReturnArgX5624 = function (iCeX154, oCeX143) {
                                              const fooArrElementX3277 = [0, oCeX143];
                                              const fooReturnArgX5625 = RP(rCeX222, iCeX154, [1, nCeX415, fooArrElementX3277], qNeX60);
                                              return fooReturnArgX5625;
                                            };
                                            const WNeX66 = SSA_SNeX76[1];
                                            const fooBinBothRhsX4247 = WNeX66[0];
                                            const qNeX60 = SSA_SNeX76[2];
                                            const GNeX69 = WNeX66[1][1];
                                            const nCeX415 = SSA_xNeX108;
                                            const rCeX222 = SSA_bNeX94;
                                            if (0 === fooBinBothRhsX4247) {
                                              SSA_bNeX94 = fooReturnArgX5624;
                                              SSA_xNeX108 = 0;
                                              SSA_SNeX76 = GNeX69;
                                            } else {
                                              SSA_bNeX94 = fooReturnArgX5626;
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
const a = function($$0 ) {
  const b = $$0;
  debugger;
  return b;
};
const c = function($$0,$$1,$$2,$$3,$$4 ) {
  const d = $$1;
  const e = $$3;
  const f = $$4;
  debugger;
  const g = function($$0 ) {
    const h = $$0;
    debugger;
    const i = [ 5, j, h ];
    const k = RP$cloneX5( l, $, i, m );
    return k;
  };
  const n = function($$0 ) {
    const o = $$0;
    debugger;
    const p = $yX2( Iq, o );
    const q = [ 4, j, p ];
    const r = RP$cloneX5( l, $, q, s );
    return r;
  };
  const t = function() {
    debugger;
    const u = RP$cloneX5( l, $, v, w );
    return u;
  };
  const x = function($$0 ) {
    const y = $$0;
    debugger;
    const z = [ 6, j, y ];
    const ba = RP$cloneX5( l, $, z, bb );
    return ba;
  };
  const bc = function($$0,$$1 ) {
    const bd = $$0;
    const be = $$1;
    debugger;
    const bf = function($$0 ) {
      const bg = $$0;
      debugger;
      const bh = YE( bd, bg, be );
      return bh;
    };
    const bi = [ 6, j, bf ];
    const bj = RP$cloneX5( l, $, bi, bk );
    return bj;
  };
  let bl = undefined;
  const bm = function($$0 ) {
    const bn = $$0;
    debugger;
    const bo = bn[ 1 ];
    const bp = PA( bl );
    const bq = WE( bp );
    const br = YA( bo, bq );
    const bs = br[ 2 ];
    const bt = typeof bs;
    const bu = "number" == bt;
    if (bu) {
      const bv = br[ 1 ];
      const bw = ZE( bv, bx );
      const by = RP$cloneX5( l, $, j, bw );
      return by;
    }
    else {
      throw JAe;
    }
  };
  const bz = function() {
    debugger;
    const ca = [ 4, j, cb ];
    const cc = RP$cloneX5( l, $, ca, cd );
    return cc;
  };
  let ce = undefined;
  const cf = function($$0 ) {
    const cg = $$0;
    debugger;
    let ch = undefined;
    if (cg) {
      ch = TU;
    }
    else {
      ch = _U;
    }
    const ci = [ 4, j, ch ];
    const cj = RP$cloneX5( l, $, ci, ce );
    return cj;
  };
  const ck = function($$0,$$1 ) {
    const cl = $$0;
    const cm = $$1;
    debugger;
    const cn = SP( co, cp, cm );
    const cq = UA( cr, cl, cn );
    const cs = [ 4, j, cq ];
    const ct = RP$cloneX5( l, $, cs, cu );
    return ct;
  };
  const cv = function($$0,$$1,$$2 ) {
    const cw = $$0;
    const cx = $$1;
    const cy = $$2;
    debugger;
    const cz = SP( co, cx, cy );
    const da = UA( cr, cw, cz );
    const db = [ 4, j, da ];
    const dc = RP$cloneX5( l, $, db, cu );
    return dc;
  };
  const dd = function($$0,$$1 ) {
    const de = $$0;
    const df = $$1;
    debugger;
    const dg = SP( co, zAe, df );
    const dh = UA( cr, de, dg );
    const di = [ 4, j, dh ];
    const dj = RP$cloneX5( l, $, di, cu );
    return dj;
  };
  const dk = function($$0 ) {
    const dl = $$0;
    debugger;
    const dm = SP( co, dn, dl );
    const dp = UA( dq, dr, dm );
    const ds = [ 4, j, dp ];
    const dt = RP$cloneX5( l, $, ds, cu );
    return dt;
  };
  const du = function($$0,$$1 ) {
    const dv = $$0;
    const dw = $$1;
    debugger;
    const dx = SP( co, dv, dw );
    const dy = UA( dq, dr, dx );
    const dz = [ 4, j, dy ];
    const ea = RP$cloneX5( l, $, dz, cu );
    return ea;
  };
  const eb = function($$0 ) {
    const ec = $$0;
    debugger;
    const ed = SP( co, zAe, ec );
    const ee = UA( dq, dr, ed );
    const ef = [ 4, j, ee ];
    const eg = RP$cloneX5( l, $, ef, cu );
    return eg;
  };
  const eh = function($$0 ) {
    const ei = $$0;
    debugger;
    const ej = SP( co, ek, ei );
    const el = [ 4, j, ej ];
    const em = RP$cloneX5( l, $, el, cu );
    return em;
  };
  const en = function($$0,$$1 ) {
    const eo = $$0;
    const ep = $$1;
    debugger;
    const eq = SP( co, eo, ep );
    const er = [ 4, j, eq ];
    const es = RP$cloneX5( l, $, er, cu );
    return es;
  };
  const et = function($$0 ) {
    const eu = $$0;
    debugger;
    const ev = SP( co, zAe, eu );
    const ew = [ 4, j, ev ];
    const ex = RP$cloneX5( l, $, ew, cu );
    return ex;
  };
  const ey = function($$0 ) {
    const ez = $$0;
    debugger;
    const fa = XT( ez );
    const fb = __( fa, Jq );
    const fc = [ 4, j, fb ];
    const fd = RP$cloneX5( l, $, fc, fe );
    return fd;
  };
  let ff = undefined;
  let cb = undefined;
  let w = undefined;
  let dn = undefined;
  let s = undefined;
  let dq = undefined;
  let cd = undefined;
  let cu = undefined;
  let m = undefined;
  let cp = undefined;
  let l = d;
  let j = e;
  let fe = undefined;
  let bk = undefined;
  let bx = undefined;
  let bb = undefined;
  let v = undefined;
  const fg = function($$0 ) {
    const fh = $$0;
    debugger;
    const fi = [ 5, j, fh ];
    const fj = RP$cloneX5( l, $, fi, ff );
    return fj;
  };
  let cr = undefined;
  let co = undefined;
  let ek = undefined;
  let dr = undefined;
  let fk = f;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const fl = typeof fk;
    const fm = "number" == fl;
    if (fm) {
      const fn = YE$cloneX5( l, $, j );
      return fn;
    }
    else {
      const fo = fk[ 0 ];
      let fp = 24;
      const fq = 0 === fo;
      if (fq) {
        fp = 0;
      }
      else {
        const fr = 1 === fo;
        if (fr) {
          fp = 1;
        }
        else {
          const fs = 2 === fo;
          if (fs) {
            fp = 2;
          }
          else {
            const ft = 3 === fo;
            if (ft) {
              fp = 3;
            }
            else {
              const fu = 4 === fo;
              if (fu) {
                fp = 4;
              }
              else {
                const fv = 5 === fo;
                if (fv) {
                  fp = 5;
                }
                else {
                  const fw = 6 === fo;
                  if (fw) {
                    fp = 6;
                  }
                  else {
                    const fx = 7 === fo;
                    if (fx) {
                      fp = 7;
                    }
                    else {
                      const fy = 8 === fo;
                      if (fy) {
                        fp = 8;
                      }
                      else {
                        const fz = 9 === fo;
                        if (fz) {
                          fp = 9;
                        }
                        else {
                          const ga = 10 === fo;
                          if (ga) {
                            fp = 10;
                          }
                          else {
                            const gb = 11 === fo;
                            if (gb) {
                              fp = 11;
                            }
                            else {
                              const gc = 12 === fo;
                              if (gc) {
                                fp = 12;
                              }
                              else {
                                const gd = 13 === fo;
                                if (gd) {
                                  fp = 13;
                                }
                                else {
                                  const ge = 14 === fo;
                                  if (ge) {
                                    fp = 14;
                                  }
                                  else {
                                    const gf = 15 === fo;
                                    if (gf) {
                                      fp = 15;
                                    }
                                    else {
                                      const gg = 16 === fo;
                                      if (gg) {
                                        fp = 16;
                                      }
                                      else {
                                        const gh = 17 === fo;
                                        if (gh) {
                                          fp = 17;
                                        }
                                        else {
                                          const gi = 18 === fo;
                                          if (gi) {
                                            fp = 18;
                                          }
                                          else {
                                            const gj = 19 === fo;
                                            if (gj) {
                                              fp = 19;
                                            }
                                            else {
                                              const gk = 20 === fo;
                                              if (gk) {
                                                fp = 20;
                                              }
                                              else {
                                                const gl = 21 === fo;
                                                if (gl) {
                                                  fp = 21;
                                                }
                                                else {
                                                  const gm = 22 === fo;
                                                  if (gm) {
                                                    fp = 22;
                                                  }
                                                  else {
                                                    const gn = 23 === fo;
                                                    if (gn) {
                                                      fp = 23;
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
      const go = fp <= 0;
      if (go) {
        ff = fk[ 1 ];
        return fg;
      }
      else {
        const gp = fp <= 1;
        if (gp) {
          fe = fk[ 1 ];
          return ey;
        }
        else {
          const gq = fp <= 2;
          if (gq) {
            const gr = fk[ 2 ];
            const gs = fk[ 1 ];
            const gt = NP$cloneX2$clone( $, l, $, j, gr, gs, a );
            return gt;
          }
          else {
            const gu = fp <= 3;
            if (gu) {
              const gv = fk[ 2 ];
              const gw = fk[ 1 ];
              const gx = NP$cloneX2$clone( $, l, $, j, gv, gw, WA );
              return gx;
            }
            else {
              const gy = fp <= 4;
              if (gy) {
                const gz = fk[ 4 ];
                const ha = fk[ 2 ];
                const hb = fk[ 3 ];
                const hc = fk[ 1 ];
                const hd = LP$cloneX2$clone( $, l, $, j, gz, ha, hb, ZA, hc );
                return hd;
              }
              else {
                const he = fp <= 5;
                if (he) {
                  const hf = fk[ 4 ];
                  const hg = fk[ 2 ];
                  const hh = fk[ 3 ];
                  const hi = fk[ 1 ];
                  const hj = LP$cloneX2$clone( $, l, $, j, hf, hg, hh, KA, hi );
                  return hj;
                }
                else {
                  const hk = fp <= 6;
                  if (hk) {
                    const hl = fk[ 4 ];
                    const hm = fk[ 2 ];
                    const hn = fk[ 3 ];
                    const ho = fk[ 1 ];
                    const hp = LP$cloneX2$clone( $, l, $, j, hl, hm, hn, QA, ho );
                    return hp;
                  }
                  else {
                    const hq = fp <= 7;
                    if (hq) {
                      const hr = fk[ 4 ];
                      const hs = fk[ 2 ];
                      const ht = fk[ 3 ];
                      const hu = fk[ 1 ];
                      const hv = LP$cloneX2$clone( $, l, $, j, hr, hs, ht, $A, hu );
                      return hv;
                    }
                    else {
                      const hw = fp <= 8;
                      if (hw) {
                        cu = fk[ 4 ];
                        const hx = fk[ 3 ];
                        const hy = fk[ 2 ];
                        co = fk[ 1 ];
                        const hz = typeof hy;
                        const ia = "number" == hz;
                        if (ia) {
                          const ib = typeof hx;
                          const ic = "number" == ib;
                          if (ic) {
                            const id = 0 === hx;
                            if (id) {
                              return et;
                            }
                            else {
                              return en;
                            }
                          }
                          else {
                            ek = hx[ 1 ];
                            return eh;
                          }
                        }
                        else {
                          const ie = hy[ 0 ];
                          const ig = 0 === ie;
                          if (ig) {
                            dr = hy[ 2 ];
                            dq = hy[ 1 ];
                            const ih = typeof hx;
                            const ii = "number" == ih;
                            if (ii) {
                              const ij = 0 === hx;
                              if (ij) {
                                return eb;
                              }
                              else {
                                return du;
                              }
                            }
                            else {
                              dn = hx[ 1 ];
                              return dk;
                            }
                          }
                          else {
                            cr = hy[ 1 ];
                            const ik = typeof hx;
                            const il = "number" == ik;
                            if (il) {
                              const im = 0 === hx;
                              if (im) {
                                return dd;
                              }
                              else {
                                return cv;
                              }
                            }
                            else {
                              cp = hx[ 1 ];
                              return ck;
                            }
                          }
                        }
                      }
                      else {
                        const io = fp <= 9;
                        if (io) {
                          ce = fk[ 1 ];
                          return cf;
                        }
                        else {
                          const ip = fp <= 10;
                          if (ip) {
                            j = [ 7, j ];
                            fk = fk[ 1 ];
                          }
                          else {
                            const iq = fp <= 11;
                            if (iq) {
                              const ir = fk[ 1 ];
                              j = [ 2, j, ir ];
                              fk = fk[ 2 ];
                            }
                            else {
                              const is = fp <= 12;
                              if (is) {
                                const it = fk[ 1 ];
                                j = [ 3, j, it ];
                                fk = fk[ 2 ];
                              }
                              else {
                                const iu = fp <= 13;
                                if (iu) {
                                  cd = fk[ 3 ];
                                  const iv = fk[ 2 ];
                                  const iw = Q_$clone( $ );
                                  _A( iw, iv );
                                  cb = TA( iw );
                                  return bz;
                                }
                                else {
                                  const ix = fp <= 14;
                                  if (ix) {
                                    bx = fk[ 3 ];
                                    bl = fk[ 2 ];
                                    return bm;
                                  }
                                  else {
                                    const iy = fp <= 15;
                                    if (iy) {
                                      bk = fk[ 1 ];
                                      return bc;
                                    }
                                    else {
                                      const iz = fp <= 16;
                                      if (iz) {
                                        bb = fk[ 1 ];
                                        return x;
                                      }
                                      else {
                                        const ja = fp <= 17;
                                        if (ja) {
                                          const jb = fk[ 1 ];
                                          j = [ 0, j, jb ];
                                          fk = fk[ 2 ];
                                        }
                                        else {
                                          const jc = fp <= 18;
                                          if (jc) {
                                            const jd = function($$0,$$1 ) {
                                              const je = $$0;
                                              const jf = $$1;
                                              debugger;
                                              const jg = [ 1, jf ];
                                              const jh = [ 1, ji, jg ];
                                              const jj = RP( jk, je, jh, jl );
                                              return jj;
                                            };
                                            const jm = function($$0,$$1 ) {
                                              const jn = $$0;
                                              const jo = $$1;
                                              debugger;
                                              const jp = [ 0, jo ];
                                              const jq = [ 1, ji, jp ];
                                              const jr = RP( jk, jn, jq, jl );
                                              return jr;
                                            };
                                            const js = fk[ 1 ];
                                            const jt = js[ 0 ];
                                            const jl = fk[ 2 ];
                                            const ju = js[ 1 ];
                                            const jv = ju[ 1 ];
                                            const ji = j;
                                            const jk = l;
                                            const jw = 0 === jt;
                                            if (jw) {
                                              l = jm;
                                              j = 0;
                                              fk = jv;
                                            }
                                            else {
                                              l = jd;
                                              j = 0;
                                              fk = jv;
                                            }
                                          }
                                          else {
                                            const jx = fp <= 19;
                                            if (jx) {
                                              const jy = [ 0, WB, Rq ];
                                              throw jy;
                                            }
                                            else {
                                              const jz = fp <= 20;
                                              if (jz) {
                                                w = fk[ 3 ];
                                                v = [ 8, j, Mq ];
                                                return t;
                                              }
                                              else {
                                                const ka = fp <= 21;
                                                if (ka) {
                                                  s = fk[ 2 ];
                                                  return n;
                                                }
                                                else {
                                                  const kb = fp <= 22;
                                                  if (kb) {
                                                    m = fk[ 1 ];
                                                    return g;
                                                  }
                                                  else {
                                                    const kc = fp <= 23;
                                                    if (kc) {
                                                      const kd = fk[ 2 ];
                                                      const ke = fk[ 1 ];
                                                      const kf = typeof ke;
                                                      const kg = "number" == kf;
                                                      if (kg) {
                                                        let kh = 4;
                                                        const ki = 0 === ke;
                                                        if (ki) {
                                                          kh = 0;
                                                        }
                                                        else {
                                                          const kj = 1 === ke;
                                                          if (kj) {
                                                            kh = 1;
                                                          }
                                                          else {
                                                            const kk = 2 === ke;
                                                            if (kk) {
                                                              kh = 2;
                                                            }
                                                            else {
                                                              const kl = 3 === ke;
                                                              if (kl) {
                                                                kh = 3;
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const km = kh <= 0;
                                                        if (km) {
                                                          const kn = PP$cloneX3$clone( $, l, $, j, kd );
                                                          return kn;
                                                        }
                                                        else {
                                                          const ko = kh <= 1;
                                                          if (ko) {
                                                            const kp = PP$cloneX3$clone( $, l, $, j, kd );
                                                            return kp;
                                                          }
                                                          else {
                                                            const kq = kh <= 2;
                                                            if (kq) {
                                                              const kr = PP$cloneX3$clone( $, l, $, j, kd );
                                                              return kr;
                                                            }
                                                            else {
                                                              const ks = kh <= 3;
                                                              if (ks) {
                                                                const kt = [ 0, WB, Oq ];
                                                                throw kt;
                                                              }
                                                              else {
                                                                const ku = PP$cloneX3$clone( $, l, $, j, kd );
                                                                return ku;
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                      else {
                                                        const kv = ke[ 0 ];
                                                        let kw = 10;
                                                        const kx = 0 === kv;
                                                        if (kx) {
                                                          kw = 0;
                                                        }
                                                        else {
                                                          const ky = 1 === kv;
                                                          if (ky) {
                                                            kw = 1;
                                                          }
                                                          else {
                                                            const kz = 2 === kv;
                                                            if (kz) {
                                                              kw = 2;
                                                            }
                                                            else {
                                                              const la = 3 === kv;
                                                              if (la) {
                                                                kw = 3;
                                                              }
                                                              else {
                                                                const lb = 4 === kv;
                                                                if (lb) {
                                                                  kw = 4;
                                                                }
                                                                else {
                                                                  const lc = 5 === kv;
                                                                  if (lc) {
                                                                    kw = 5;
                                                                  }
                                                                  else {
                                                                    const ld = 6 === kv;
                                                                    if (ld) {
                                                                      kw = 6;
                                                                    }
                                                                    else {
                                                                      const le = 7 === kv;
                                                                      if (le) {
                                                                        kw = 7;
                                                                      }
                                                                      else {
                                                                        const lf = 8 === kv;
                                                                        if (lf) {
                                                                          kw = 8;
                                                                        }
                                                                        else {
                                                                          const lg = 9 === kv;
                                                                          if (lg) {
                                                                            kw = 9;
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
                                                        const lh = kw <= 0;
                                                        if (lh) {
                                                          const li = PP$cloneX3$clone( $, l, $, j, kd );
                                                          return li;
                                                        }
                                                        else {
                                                          const lj = kw <= 1;
                                                          if (lj) {
                                                            const lk = PP$cloneX3$clone( $, l, $, j, kd );
                                                            return lk;
                                                          }
                                                          else {
                                                            const ll = kw <= 2;
                                                            if (ll) {
                                                              const lm = PP$cloneX3$clone( $, l, $, j, kd );
                                                              return lm;
                                                            }
                                                            else {
                                                              const ln = kw <= 3;
                                                              if (ln) {
                                                                const lo = PP$cloneX3$clone( $, l, $, j, kd );
                                                                return lo;
                                                              }
                                                              else {
                                                                const lp = kw <= 4;
                                                                if (lp) {
                                                                  const lq = PP$cloneX3$clone( $, l, $, j, kd );
                                                                  return lq;
                                                                }
                                                                else {
                                                                  const lr = kw <= 5;
                                                                  if (lr) {
                                                                    const ls = PP$cloneX3$clone( $, l, $, j, kd );
                                                                    return ls;
                                                                  }
                                                                  else {
                                                                    const lt = kw <= 6;
                                                                    if (lt) {
                                                                      const lu = PP$cloneX3$clone( $, l, $, j, kd );
                                                                      return lu;
                                                                    }
                                                                    else {
                                                                      const lv = kw <= 7;
                                                                      if (lv) {
                                                                        const lw = PP$cloneX3$clone( $, l, $, j, kd );
                                                                        return lw;
                                                                      }
                                                                      else {
                                                                        const lx = kw <= 8;
                                                                        if (lx) {
                                                                          const ly = ke[ 2 ];
                                                                          const lz = _P$cloneX4$clone( $, l, $, j, ly, kd );
                                                                          return lz;
                                                                        }
                                                                        else {
                                                                          const ma = PP$cloneX3$clone( $, l, $, j, kd );
                                                                          return ma;
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
                                                      const mb = fk[ 3 ];
                                                      const mc = fk[ 1 ];
                                                      const md = fk[ 2 ];
                                                      const me = OE$clone( md, $ );
                                                      const mf = IP$cloneX3$cloneX1( $, l, $, j, mb, mc, me );
                                                      return mf;
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
$( c );
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


BAD@! Found 37 implicit global bindings:

RP$cloneX5, $yX2, Iq, YE, PA, WE, YA, ZE, JAe, TU, _U, SP, UA, zAe, XT, __, Jq, YE$cloneX5, NP$cloneX2$clone, WA, LP$cloneX2$clone, ZA, KA, QA, $A, Q_$clone, _A, TA, RP, WB, Rq, Mq, PP$cloneX3$clone, Oq, _P$cloneX4$clone, OE$clone, IP$cloneX3$cloneX1


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
