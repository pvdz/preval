# Preval test case

# param_used_once.md

> Constants > Param used once
>
> A parameter that is used once in an assignment to another variable should be eliminated or whatever.

#TODO

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
`````

## Pre Normal

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
    const fooBinBothRhsX4240 = typeof SSA_SNeX76;
    const fooIfTestX13134 = 'number' == fooBinBothRhsX4240;
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
      const fooReturnArgX5594 = function ($$0) {
        let nCeX399 = $$0;
        debugger;
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
      const fooReturnArgX5596 = function ($$0) {
        let nCeX400 = $$0;
        debugger;
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
    const fooIfTestX13144 = fooSwitchCaseToStartX352 <= 8;
    if (fooIfTestX13144) {
      PNeX191 = SSA_SNeX76[4];
      const NNeX135 = SSA_SNeX76[3];
      const CNeX70 = SSA_SNeX76[2];
      kNeX164 = SSA_SNeX76[1];
      const fooBinBothRhsX4241 = typeof CNeX70;
      const fooIfTestX13184 = 'number' == fooBinBothRhsX4241;
      if (fooIfTestX13184) {
        const fooBinBothRhsX4244 = typeof NNeX135;
        const fooIfTestX13187 = 'number' == fooBinBothRhsX4244;
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
              const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, fooCalleeParamX11269);
              return fooReturnArgX5601;
            };
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
              const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, fooCalleeParamX11272);
              return fooReturnArgX5602;
            };
          }
          return fooReturnArgX5600;
        }
        vNeX134 = NNeX135[1];
        const fooReturnArgX5599 = function ($$0) {
          let nCeX404 = $$0;
          debugger;
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
        const fooIfTestX13189 = 'number' == fooBinBothRhsX4245;
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
              const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, fooCalleeParamX11281);
              return fooReturnArgX5606;
            };
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
              const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, fooCalleeParamX11287);
              return fooReturnArgX5607;
            };
          }
          return fooReturnArgX5605;
        }
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
          const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, fooCalleeParamX11293);
          return fooReturnArgX5608;
        };
        return fooReturnArgX5604;
      }
      jNeX68 = CNeX70[1];
      const fooBinBothRhsX4243 = typeof NNeX135;
      const fooIfTestX13186 = 'number' == fooBinBothRhsX4243;
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
            const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, fooCalleeParamX11298);
            return fooReturnArgX5610;
          };
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
            const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, fooCalleeParamX11303);
            return fooReturnArgX5611;
          };
        }
        return fooReturnArgX5609;
      }
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
        const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, fooCalleeParamX11308);
        return fooReturnArgX5612;
      };
      return fooReturnArgX5598;
    }
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
        debugger;
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
      const fooReturnArgX5617 = function ($$0) {
        let nCeX412 = $$0;
        debugger;
        const rCeX220 = nCeX412[1];
        const fooCalleeParamX11315 = PA(BNeX51);
        const fooCalleeParamX11316 = WE(fooCalleeParamX11315);
        const sCeX130 = YA(rCeX220, fooCalleeParamX11316);
        const fooUnaryArgX395 = sCeX130[2];
        const fooBinBothRhsX4246 = typeof fooUnaryArgX395;
        const fooIfTestX13192 = 'number' == fooBinBothRhsX4246;
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
        const fooReturnArgX5620 = RP$cloneX5(fooCalleeParamX11322, $, fooCalleeParamX11323, fooCalleeParamX11324);
        return fooReturnArgX5620;
      };
      return fooReturnArgX5619;
    }
    const fooIfTestX13152 = fooSwitchCaseToStartX352 <= 16;
    if (fooIfTestX13152) {
      XNeX77 = SSA_SNeX76[1];
      const fooReturnArgX5622 = function ($$0) {
        let nCeX414 = $$0;
        debugger;
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
        continue;
      }
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
        debugger;
        const fooReturnArgX5629 = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
        return fooReturnArgX5629;
      };
      return fooReturnArgX5628;
    }
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
        const fooReturnArgX5631 = RP$cloneX5(fooCalleeParamX11330, $, fooCalleeParamX11331, fooCalleeParamX11332);
        return fooReturnArgX5631;
      };
      return fooReturnArgX5630;
    }
    const fooIfTestX13158 = fooSwitchCaseToStartX352 <= 22;
    if (fooIfTestX13158) {
      QNeX102 = SSA_SNeX76[1];
      const fooReturnArgX5632 = function ($$0) {
        let nCeX418 = $$0;
        debugger;
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
      const fooIfTestX13194 = 'number' == fooBinBothRhsX4248;
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
    }
  }
};
`````

## Normalized

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
    const fooBinBothRhsX4240 = typeof SSA_SNeX76;
    const fooIfTestX13134 = 'number' == fooBinBothRhsX4240;
    if (fooIfTestX13134) {
      const fooReturnArgX5593 = YE$cloneX5(SSA_bNeX94, $, SSA_xNeX108);
      return fooReturnArgX5593;
    } else {
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
        const fooReturnArgX5595 = RP$cloneX5(fooCalleeParamX11228, $, fooCalleeParamX11229, fooCalleeParamX11230);
        return fooReturnArgX5595;
      };
      return fooReturnArgX5594;
    } else {
    }
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
        const fooArrElementX3213 = __(fooCalleeParamX11232, fooCalleeParamX11233);
        const fooCalleeParamX11234 = [4, fooArrElementX3211, fooArrElementX3213];
        const fooCalleeParamX11235 = TNeX211;
        const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, fooCalleeParamX11235);
        return fooReturnArgX5597;
      };
      return fooReturnArgX5596;
    } else {
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
    const fooIfTestX13144 = fooSwitchCaseToStartX352 <= 8;
    if (fooIfTestX13144) {
      PNeX191 = SSA_SNeX76[4];
      const NNeX135 = SSA_SNeX76[3];
      const CNeX70 = SSA_SNeX76[2];
      kNeX164 = SSA_SNeX76[1];
      const fooBinBothRhsX4241 = typeof CNeX70;
      const fooIfTestX13184 = 'number' == fooBinBothRhsX4241;
      if (fooIfTestX13184) {
        const fooBinBothRhsX4244 = typeof NNeX135;
        const fooIfTestX13187 = 'number' == fooBinBothRhsX4244;
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
              const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, fooCalleeParamX11269);
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
              const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, fooCalleeParamX11272);
              return fooReturnArgX5602;
            };
            return fooReturnArgX5600;
          }
        } else {
        }
        vNeX134 = NNeX135[1];
        const fooReturnArgX5599 = function ($$0) {
          let nCeX404 = $$0;
          debugger;
          const fooCalleeParamX11273 = SSA_bNeX94;
          const fooArrElementX3223 = SSA_xNeX108;
          const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
          const fooCalleeParamX11274 = [4, fooArrElementX3223, fooArrElementX3225];
          const fooCalleeParamX11275 = PNeX191;
          const fooReturnArgX5603 = RP$cloneX5(fooCalleeParamX11273, $, fooCalleeParamX11274, fooCalleeParamX11275);
          return fooReturnArgX5603;
        };
        return fooReturnArgX5599;
      } else {
      }
      const fooBinBothRhsX4242 = CNeX70[0];
      const fooIfTestX13185 = 0 === fooBinBothRhsX4242;
      if (fooIfTestX13185) {
        wNeX70 = CNeX70[2];
        LNeX86 = CNeX70[1];
        const fooBinBothRhsX4245 = typeof NNeX135;
        const fooIfTestX13189 = 'number' == fooBinBothRhsX4245;
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
              const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, fooCalleeParamX11281);
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
              const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, fooCalleeParamX11287);
              return fooReturnArgX5607;
            };
            return fooReturnArgX5605;
          }
        } else {
        }
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
          const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, fooCalleeParamX11293);
          return fooReturnArgX5608;
        };
        return fooReturnArgX5604;
      } else {
      }
      jNeX68 = CNeX70[1];
      const fooBinBothRhsX4243 = typeof NNeX135;
      const fooIfTestX13186 = 'number' == fooBinBothRhsX4243;
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
            const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, fooCalleeParamX11298);
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
            const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, fooCalleeParamX11303);
            return fooReturnArgX5611;
          };
          return fooReturnArgX5609;
        }
      } else {
      }
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
        const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, fooCalleeParamX11308);
        return fooReturnArgX5612;
      };
      return fooReturnArgX5598;
    } else {
    }
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
        const fooReturnArgX5614 = RP$cloneX5(fooCalleeParamX11309, $, fooCalleeParamX11310, fooCalleeParamX11311);
        return fooReturnArgX5614;
      };
      return fooReturnArgX5613;
    } else {
    }
    const fooIfTestX13146 = fooSwitchCaseToStartX352 <= 10;
    if (fooIfTestX13146) {
      SSA_xNeX108 = [7, SSA_xNeX108];
      SSA_SNeX76 = SSA_SNeX76[1];
      continue;
    } else {
    }
    const fooIfTestX13147 = fooSwitchCaseToStartX352 <= 11;
    if (fooIfTestX13147) {
      const fooArrElementX3257 = SSA_xNeX108;
      const fooArrElementX3259 = SSA_SNeX76[1];
      SSA_xNeX108 = [2, fooArrElementX3257, fooArrElementX3259];
      SSA_SNeX76 = SSA_SNeX76[2];
      continue;
    } else {
    }
    const fooIfTestX13148 = fooSwitchCaseToStartX352 <= 12;
    if (fooIfTestX13148) {
      const fooArrElementX3262 = SSA_xNeX108;
      const fooArrElementX3264 = SSA_SNeX76[1];
      SSA_xNeX108 = [3, fooArrElementX3262, fooArrElementX3264];
      SSA_SNeX76 = SSA_SNeX76[2];
      continue;
    } else {
    }
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
        const fooReturnArgX5616 = RP$cloneX5(fooCalleeParamX11312, $, fooCalleeParamX11313, fooCalleeParamX11314);
        return fooReturnArgX5616;
      };
      return fooReturnArgX5615;
    } else {
    }
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
        const fooIfTestX13192 = 'number' == fooBinBothRhsX4246;
        if (fooIfTestX13192) {
          const fooCalleeParamX11317 = SSA_bNeX94;
          const fooCalleeParamX11318 = SSA_xNeX108;
          const fooCalleeParamX11319 = sCeX130[1];
          const fooCalleeParamX11320 = VNeX53;
          const fooCalleeParamX11321 = ZE(fooCalleeParamX11319, fooCalleeParamX11320);
          const fooReturnArgX5618 = RP$cloneX5(fooCalleeParamX11317, $, fooCalleeParamX11318, fooCalleeParamX11321);
          return fooReturnArgX5618;
        } else {
        }
        throw JAe;
      };
      return fooReturnArgX5617;
    } else {
    }
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
        const fooReturnArgX5620 = RP$cloneX5(fooCalleeParamX11322, $, fooCalleeParamX11323, fooCalleeParamX11324);
        return fooReturnArgX5620;
      };
      return fooReturnArgX5619;
    } else {
    }
    const fooIfTestX13152 = fooSwitchCaseToStartX352 <= 16;
    if (fooIfTestX13152) {
      XNeX77 = SSA_SNeX76[1];
      const fooReturnArgX5622 = function ($$0) {
        let nCeX414 = $$0;
        debugger;
        const fooCalleeParamX11325 = SSA_bNeX94;
        const fooCalleeParamX11326 = [6, SSA_xNeX108, nCeX414];
        const fooCalleeParamX11327 = XNeX77;
        const fooReturnArgX5623 = RP$cloneX5(fooCalleeParamX11325, $, fooCalleeParamX11326, fooCalleeParamX11327);
        return fooReturnArgX5623;
      };
      return fooReturnArgX5622;
    } else {
    }
    const fooIfTestX13153 = fooSwitchCaseToStartX352 <= 17;
    if (fooIfTestX13153) {
      const fooArrElementX3272 = SSA_xNeX108;
      const fooArrElementX3274 = SSA_SNeX76[1];
      SSA_xNeX108 = [0, fooArrElementX3272, fooArrElementX3274];
      SSA_SNeX76 = SSA_SNeX76[2];
      continue;
    } else {
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
        continue;
      } else {
      }
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
      continue;
    } else {
    }
    const fooIfTestX13155 = fooSwitchCaseToStartX352 <= 19;
    if (fooIfTestX13155) {
      const fooThrowArgX300 = [0, WB, Rq];
      throw fooThrowArgX300;
    } else {
    }
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
    }
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
        const fooReturnArgX5631 = RP$cloneX5(fooCalleeParamX11330, $, fooCalleeParamX11331, fooCalleeParamX11332);
        return fooReturnArgX5631;
      };
      return fooReturnArgX5630;
    } else {
    }
    const fooIfTestX13158 = fooSwitchCaseToStartX352 <= 22;
    if (fooIfTestX13158) {
      QNeX102 = SSA_SNeX76[1];
      const fooReturnArgX5632 = function ($$0) {
        let nCeX418 = $$0;
        debugger;
        const fooCalleeParamX11333 = SSA_bNeX94;
        const fooCalleeParamX11334 = [5, SSA_xNeX108, nCeX418];
        const fooCalleeParamX11335 = QNeX102;
        const fooReturnArgX5633 = RP$cloneX5(fooCalleeParamX11333, $, fooCalleeParamX11334, fooCalleeParamX11335);
        return fooReturnArgX5633;
      };
      return fooReturnArgX5632;
    } else {
    }
    const fooIfTestX13159 = fooSwitchCaseToStartX352 <= 23;
    if (fooIfTestX13159) {
      const $NeX101 = SSA_SNeX76[2];
      const eCeX71 = SSA_SNeX76[1];
      const fooBinBothRhsX4248 = typeof eCeX71;
      const fooIfTestX13194 = 'number' == fooBinBothRhsX4248;
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
          const SSA_fooReturnArgX144 = PP$cloneX3$clone($, fooCalleeParamX11336, $, fooCalleeParamX11337, $NeX101);
          return SSA_fooReturnArgX144;
        } else {
        }
        const fooIfTestX13197 = fooSwitchCaseToStartX353 <= 1;
        if (fooIfTestX13197) {
          const fooCalleeParamX11338 = SSA_bNeX94;
          const fooCalleeParamX11339 = SSA_xNeX108;
          const SSA_fooReturnArgX145 = PP$cloneX3$clone($, fooCalleeParamX11338, $, fooCalleeParamX11339, $NeX101);
          return SSA_fooReturnArgX145;
        } else {
        }
        const fooIfTestX13198 = fooSwitchCaseToStartX353 <= 2;
        if (fooIfTestX13198) {
          const fooCalleeParamX11340 = SSA_bNeX94;
          const fooCalleeParamX11341 = SSA_xNeX108;
          const SSA_fooReturnArgX146 = PP$cloneX3$clone($, fooCalleeParamX11340, $, fooCalleeParamX11341, $NeX101);
          return SSA_fooReturnArgX146;
        } else {
        }
        const fooIfTestX13199 = fooSwitchCaseToStartX353 <= 3;
        if (fooIfTestX13199) {
          const fooThrowArgX301 = [0, WB, Oq];
          throw fooThrowArgX301;
        } else {
        }
        const fooIfTestX13200 = fooSwitchCaseToStartX353 <= 4;
        if (fooIfTestX13200) {
          const fooCalleeParamX11342 = SSA_bNeX94;
          const fooCalleeParamX11343 = SSA_xNeX108;
          const SSA_fooReturnArgX147 = PP$cloneX3$clone($, fooCalleeParamX11342, $, fooCalleeParamX11343, $NeX101);
          return SSA_fooReturnArgX147;
        } else {
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
          const SSA_fooReturnArgX148 = PP$cloneX3$clone($, fooCalleeParamX11344, $, fooCalleeParamX11345, $NeX101);
          return SSA_fooReturnArgX148;
        } else {
        }
        const fooIfTestX13206 = fooSwitchCaseToStartX354 <= 1;
        if (fooIfTestX13206) {
          const fooCalleeParamX11346 = SSA_bNeX94;
          const fooCalleeParamX11347 = SSA_xNeX108;
          const SSA_fooReturnArgX149 = PP$cloneX3$clone($, fooCalleeParamX11346, $, fooCalleeParamX11347, $NeX101);
          return SSA_fooReturnArgX149;
        } else {
        }
        const fooIfTestX13207 = fooSwitchCaseToStartX354 <= 2;
        if (fooIfTestX13207) {
          const fooCalleeParamX11348 = SSA_bNeX94;
          const fooCalleeParamX11349 = SSA_xNeX108;
          const SSA_fooReturnArgX150 = PP$cloneX3$clone($, fooCalleeParamX11348, $, fooCalleeParamX11349, $NeX101);
          return SSA_fooReturnArgX150;
        } else {
        }
        const fooIfTestX13208 = fooSwitchCaseToStartX354 <= 3;
        if (fooIfTestX13208) {
          const fooCalleeParamX11350 = SSA_bNeX94;
          const fooCalleeParamX11351 = SSA_xNeX108;
          const SSA_fooReturnArgX151 = PP$cloneX3$clone($, fooCalleeParamX11350, $, fooCalleeParamX11351, $NeX101);
          return SSA_fooReturnArgX151;
        } else {
        }
        const fooIfTestX13209 = fooSwitchCaseToStartX354 <= 4;
        if (fooIfTestX13209) {
          const fooCalleeParamX11352 = SSA_bNeX94;
          const fooCalleeParamX11353 = SSA_xNeX108;
          const SSA_fooReturnArgX152 = PP$cloneX3$clone($, fooCalleeParamX11352, $, fooCalleeParamX11353, $NeX101);
          return SSA_fooReturnArgX152;
        } else {
        }
        const fooIfTestX13210 = fooSwitchCaseToStartX354 <= 5;
        if (fooIfTestX13210) {
          const fooCalleeParamX11354 = SSA_bNeX94;
          const fooCalleeParamX11355 = SSA_xNeX108;
          const SSA_fooReturnArgX153 = PP$cloneX3$clone($, fooCalleeParamX11354, $, fooCalleeParamX11355, $NeX101);
          return SSA_fooReturnArgX153;
        } else {
        }
        const fooIfTestX13211 = fooSwitchCaseToStartX354 <= 6;
        if (fooIfTestX13211) {
          const fooCalleeParamX11356 = SSA_bNeX94;
          const fooCalleeParamX11357 = SSA_xNeX108;
          const SSA_fooReturnArgX154 = PP$cloneX3$clone($, fooCalleeParamX11356, $, fooCalleeParamX11357, $NeX101);
          return SSA_fooReturnArgX154;
        } else {
        }
        const fooIfTestX13212 = fooSwitchCaseToStartX354 <= 7;
        if (fooIfTestX13212) {
          const fooCalleeParamX11358 = SSA_bNeX94;
          const fooCalleeParamX11359 = SSA_xNeX108;
          const SSA_fooReturnArgX155 = PP$cloneX3$clone($, fooCalleeParamX11358, $, fooCalleeParamX11359, $NeX101);
          return SSA_fooReturnArgX155;
        } else {
        }
        const fooIfTestX13213 = fooSwitchCaseToStartX354 <= 8;
        if (fooIfTestX13213) {
          const fooCalleeParamX11360 = SSA_bNeX94;
          const fooCalleeParamX11361 = SSA_xNeX108;
          const fooCalleeParamX11362 = eCeX71[2];
          const SSA_fooReturnArgX156 = _P$cloneX4$clone($, fooCalleeParamX11360, $, fooCalleeParamX11361, fooCalleeParamX11362, $NeX101);
          return SSA_fooReturnArgX156;
        } else {
        }
        const fooIfTestX13214 = fooSwitchCaseToStartX354 <= 9;
        if (fooIfTestX13214) {
          const fooCalleeParamX11363 = SSA_bNeX94;
          const fooCalleeParamX11364 = SSA_xNeX108;
          const SSA_fooReturnArgX157 = PP$cloneX3$clone($, fooCalleeParamX11363, $, fooCalleeParamX11364, $NeX101);
          return SSA_fooReturnArgX157;
        } else {
        }
        const fooIfTestX13215 = fooSwitchCaseToStartX354 <= 10;
        if (fooIfTestX13215) {
          const fooCalleeParamX11365 = SSA_bNeX94;
          const fooCalleeParamX11366 = SSA_xNeX108;
          const SSA_fooReturnArgX158 = PP$cloneX3$clone($, fooCalleeParamX11365, $, fooCalleeParamX11366, $NeX101);
          return SSA_fooReturnArgX158;
        } else {
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
  return undefined;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
