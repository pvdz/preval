# Preval test case

# param_used_once.md

> Tofix > Param used once
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
$(TP$cloneX2$cloneX1);
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
    $continue: {
      {
        const fooBinBothRhsX4240 = typeof SSA_SNeX76;
        const fooIfTestX13134 = `number` == fooBinBothRhsX4240;
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
          break $continue;
        }
        const fooIfTestX13147 = fooSwitchCaseToStartX352 <= 11;
        if (fooIfTestX13147) {
          const fooArrElementX3257 = SSA_xNeX108;
          const fooArrElementX3259 = SSA_SNeX76[1];
          SSA_xNeX108 = [2, fooArrElementX3257, fooArrElementX3259];
          SSA_SNeX76 = SSA_SNeX76[2];
          break $continue;
        }
        const fooIfTestX13148 = fooSwitchCaseToStartX352 <= 12;
        if (fooIfTestX13148) {
          const fooArrElementX3262 = SSA_xNeX108;
          const fooArrElementX3264 = SSA_SNeX76[1];
          SSA_xNeX108 = [3, fooArrElementX3262, fooArrElementX3264];
          SSA_SNeX76 = SSA_SNeX76[2];
          break $continue;
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
            const fooIfTestX13192 = `number` == fooBinBothRhsX4246;
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
          break $continue;
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
            break $continue;
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
          break $continue;
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
              const SSA_fooReturnArgX156 = _P$cloneX4$clone(
                $,
                fooCalleeParamX11360,
                $,
                fooCalleeParamX11361,
                fooCalleeParamX11362,
                $NeX101,
              );
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
    }
  }
};
$(TP$cloneX2$cloneX1);
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
            const fooReturnArgX5595 = RP$cloneX5(fooCalleeParamX11228, $, fooCalleeParamX11229, fooCalleeParamX11230);
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
              const fooArrElementX3213 = __(fooCalleeParamX11232, fooCalleeParamX11233);
              const fooCalleeParamX11234 = [4, fooArrElementX3211, fooArrElementX3213];
              const fooCalleeParamX11235 = TNeX211;
              const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, fooCalleeParamX11235);
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
                                    const fooReturnArgX5606 = RP$cloneX5(
                                      fooCalleeParamX11276,
                                      $,
                                      fooCalleeParamX11280,
                                      fooCalleeParamX11281,
                                    );
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
                                    const fooReturnArgX5607 = RP$cloneX5(
                                      fooCalleeParamX11282,
                                      $,
                                      fooCalleeParamX11286,
                                      fooCalleeParamX11287,
                                    );
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
                                    const fooReturnArgX5610 = RP$cloneX5(
                                      fooCalleeParamX11294,
                                      $,
                                      fooCalleeParamX11297,
                                      fooCalleeParamX11298,
                                    );
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
                                    const fooReturnArgX5611 = RP$cloneX5(
                                      fooCalleeParamX11299,
                                      $,
                                      fooCalleeParamX11302,
                                      fooCalleeParamX11303,
                                    );
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
                            }
                          }
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
                                    const fooReturnArgX5616 = RP$cloneX5(
                                      fooCalleeParamX11312,
                                      $,
                                      fooCalleeParamX11313,
                                      fooCalleeParamX11314,
                                    );
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
                                        const fooCalleeParamX11321 = ZE(fooCalleeParamX11319, fooCalleeParamX11320);
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
                                        const fooReturnArgX5620 = RP$cloneX5(
                                          fooCalleeParamX11322,
                                          $,
                                          fooCalleeParamX11323,
                                          fooCalleeParamX11324,
                                        );
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
                                          const fooReturnArgX5623 = RP$cloneX5(
                                            fooCalleeParamX11325,
                                            $,
                                            fooCalleeParamX11326,
                                            fooCalleeParamX11327,
                                          );
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
                                          }
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
                                                    fooCalleeParamX11332,
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
                                                      fooCalleeParamX11335,
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
                                                          fooCalleeParamX11337,
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
                                                            fooCalleeParamX11339,
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
                                                              fooCalleeParamX11341,
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
                                                                  fooCalleeParamX11343,
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
                                                          fooCalleeParamX11345,
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
                                                            fooCalleeParamX11347,
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
                                                              fooCalleeParamX11349,
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
                                                                fooCalleeParamX11351,
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
                                                                  fooCalleeParamX11353,
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
                                                                    fooCalleeParamX11355,
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
                                                                      fooCalleeParamX11357,
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
                                                                        fooCalleeParamX11359,
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
                                                                            fooCalleeParamX11364,
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
                                                                              fooCalleeParamX11366,
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
  return undefined;
};
$(TP$cloneX2$cloneX1);
`````

## Output

`````js filename=intro
const fooCalleeParamX11238 = function ($$0) {
  const nCeX401 = $$0;
  debugger;
  return nCeX401;
};
const TP$cloneX2$cloneX1 = function ($$0, $$1, $$2, $$3, $$4) {
  const mNeX765 = $$1;
  const gNeX352 = $$3;
  const yNeX272 = $$4;
  debugger;
  const fooReturnArgX5632 = function ($$0) {
    const nCeX418 = $$0;
    debugger;
    const fooCalleeParamX11334 = [5, SSA_xNeX108, nCeX418];
    const fooReturnArgX5633 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11334, QNeX102);
    return fooReturnArgX5633;
  };
  const fooReturnArgX5630 = function ($$0) {
    const nCeX417 = $$0;
    debugger;
    const fooCalleeParamX11330 = SSA_bNeX94;
    const fooArrElementX3282 = SSA_xNeX108;
    const fooArrElementX3284 = $yX2(Iq, nCeX417);
    const fooCalleeParamX11331 = [4, fooArrElementX3282, fooArrElementX3284];
    const fooReturnArgX5631 = RP$cloneX5(fooCalleeParamX11330, $, fooCalleeParamX11331, KNeX38);
    return fooReturnArgX5631;
  };
  const fooReturnArgX5628 = function () {
    debugger;
    const fooReturnArgX5629 = RP$cloneX5(SSA_bNeX94, $, ZNeX45, HNeX48);
    return fooReturnArgX5629;
  };
  const fooReturnArgX5622 = function ($$0) {
    const nCeX414 = $$0;
    debugger;
    const fooCalleeParamX11326 = [6, SSA_xNeX108, nCeX414];
    const fooReturnArgX5623 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11326, XNeX77);
    return fooReturnArgX5623;
  };
  const fooReturnArgX5619 = function ($$0, $$1) {
    const nCeX413 = $$0;
    const rCeX221 = $$1;
    debugger;
    const fooArrElementX3269 = function ($$0) {
      const sCeX131 = $$0;
      debugger;
      const fooReturnArgX5621 = YE(nCeX413, sCeX131, rCeX221);
      return fooReturnArgX5621;
    };
    const fooCalleeParamX11323 = [6, SSA_xNeX108, fooArrElementX3269];
    const fooReturnArgX5620 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11323, UNeX80);
    return fooReturnArgX5620;
  };
  let BNeX51 = undefined;
  const fooReturnArgX5617 = function ($$0) {
    const nCeX412 = $$0;
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
      const fooCalleeParamX11321 = ZE(fooCalleeParamX11319, VNeX53);
      const fooReturnArgX5618 = RP$cloneX5(fooCalleeParamX11317, $, fooCalleeParamX11318, fooCalleeParamX11321);
      return fooReturnArgX5618;
    } else {
      throw JAe;
    }
  };
  const fooReturnArgX5615 = function () {
    debugger;
    const fooCalleeParamX11313 = [4, SSA_xNeX108, FNeX55];
    const fooReturnArgX5616 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11313, MNeX63);
    return fooReturnArgX5616;
  };
  let DNeX65 = undefined;
  const fooReturnArgX5613 = function ($$0) {
    const nCeX411 = $$0;
    debugger;
    let rCeX219 = undefined;
    if (nCeX411) {
      rCeX219 = TU;
    } else {
      rCeX219 = _U;
    }
    const fooCalleeParamX11310 = [4, SSA_xNeX108, rCeX219];
    const fooReturnArgX5614 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11310, DNeX65);
    return fooReturnArgX5614;
  };
  const fooReturnArgX5598 = function ($$0, $$1) {
    const nCeX410 = $$0;
    const rCeX218 = $$1;
    debugger;
    const fooCalleeParamX11304 = SSA_bNeX94;
    const fooArrElementX3252 = SSA_xNeX108;
    const fooCalleeParamX11305 = jNeX68;
    const fooCalleeParamX11306 = SP(kNeX164, RNeX72, rCeX218);
    const fooArrElementX3254 = UA(fooCalleeParamX11305, nCeX410, fooCalleeParamX11306);
    const fooCalleeParamX11307 = [4, fooArrElementX3252, fooArrElementX3254];
    const fooReturnArgX5612 = RP$cloneX5(fooCalleeParamX11304, $, fooCalleeParamX11307, PNeX191);
    return fooReturnArgX5612;
  };
  const fooReturnArgX5604 = function ($$0) {
    const nCeX407 = $$0;
    debugger;
    const fooCalleeParamX11288 = SSA_bNeX94;
    const fooArrElementX3237 = SSA_xNeX108;
    const fooCalleeParamX11289 = LNeX86;
    const fooCalleeParamX11290 = wNeX70;
    const fooCalleeParamX11291 = SP(kNeX164, INeX72, nCeX407);
    const fooArrElementX3239 = UA(fooCalleeParamX11289, fooCalleeParamX11290, fooCalleeParamX11291);
    const fooCalleeParamX11292 = [4, fooArrElementX3237, fooArrElementX3239];
    const fooReturnArgX5608 = RP$cloneX5(fooCalleeParamX11288, $, fooCalleeParamX11292, PNeX191);
    return fooReturnArgX5608;
  };
  const fooReturnArgX5599 = function ($$0) {
    const nCeX404 = $$0;
    debugger;
    const fooCalleeParamX11273 = SSA_bNeX94;
    const fooArrElementX3223 = SSA_xNeX108;
    const fooArrElementX3225 = SP(kNeX164, vNeX134, nCeX404);
    const fooCalleeParamX11274 = [4, fooArrElementX3223, fooArrElementX3225];
    const fooReturnArgX5603 = RP$cloneX5(fooCalleeParamX11273, $, fooCalleeParamX11274, PNeX191);
    return fooReturnArgX5603;
  };
  const fooReturnArgX5596 = function ($$0) {
    const nCeX400 = $$0;
    debugger;
    const fooCalleeParamX11231 = SSA_bNeX94;
    const fooArrElementX3211 = SSA_xNeX108;
    const fooCalleeParamX11232 = XT(nCeX400);
    Jq;
    const fooArrElementX3213 = __(fooCalleeParamX11232, Jq);
    const fooCalleeParamX11234 = [4, fooArrElementX3211, fooArrElementX3213];
    const fooReturnArgX5597 = RP$cloneX5(fooCalleeParamX11231, $, fooCalleeParamX11234, TNeX211);
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
  const fooReturnArgX5594 = function ($$0) {
    const nCeX399 = $$0;
    debugger;
    const fooCalleeParamX11229 = [5, SSA_xNeX108, nCeX399];
    const fooReturnArgX5595 = RP$cloneX5(SSA_bNeX94, $, fooCalleeParamX11229, ENeX311);
    return fooReturnArgX5595;
  };
  let jNeX68 = undefined;
  let kNeX164 = undefined;
  let vNeX134 = undefined;
  let wNeX70 = undefined;
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
          return fooReturnArgX5594;
        } else {
          const fooIfTestX13137 = fooSwitchCaseToStartX352 <= 1;
          if (fooIfTestX13137) {
            TNeX211 = SSA_SNeX76[1];
            return fooReturnArgX5596;
          } else {
            const fooIfTestX13138 = fooSwitchCaseToStartX352 <= 2;
            if (fooIfTestX13138) {
              const _NeX233 = SSA_SNeX76[2];
              const ANeX206 = SSA_SNeX76[1];
              const SSA_fooReturnArgX138 = NP$cloneX2$clone($, SSA_bNeX94, $, SSA_xNeX108, _NeX233, ANeX206, fooCalleeParamX11238);
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
                                  const nCeX402 = $$0;
                                  debugger;
                                  const fooCalleeParamX11267 = SSA_bNeX94;
                                  const fooArrElementX3215 = SSA_xNeX108;
                                  const fooArrElementX3217 = SP(kNeX164, zAe, nCeX402);
                                  const fooCalleeParamX11268 = [4, fooArrElementX3215, fooArrElementX3217];
                                  const fooReturnArgX5601 = RP$cloneX5(fooCalleeParamX11267, $, fooCalleeParamX11268, PNeX191);
                                  return fooReturnArgX5601;
                                };
                                return fooReturnArgX5600;
                              } else {
                                fooReturnArgX5600 = function ($$0, $$1) {
                                  const nCeX403 = $$0;
                                  const rCeX214 = $$1;
                                  debugger;
                                  const fooCalleeParamX11270 = SSA_bNeX94;
                                  const fooArrElementX3219 = SSA_xNeX108;
                                  const fooArrElementX3221 = SP(kNeX164, nCeX403, rCeX214);
                                  const fooCalleeParamX11271 = [4, fooArrElementX3219, fooArrElementX3221];
                                  const fooReturnArgX5602 = RP$cloneX5(fooCalleeParamX11270, $, fooCalleeParamX11271, PNeX191);
                                  return fooReturnArgX5602;
                                };
                                return fooReturnArgX5600;
                              }
                            } else {
                              vNeX134 = NNeX135[1];
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
                                    const nCeX405 = $$0;
                                    debugger;
                                    const fooCalleeParamX11276 = SSA_bNeX94;
                                    const fooArrElementX3227 = SSA_xNeX108;
                                    const fooCalleeParamX11277 = LNeX86;
                                    const fooCalleeParamX11278 = wNeX70;
                                    const fooCalleeParamX11279 = SP(kNeX164, zAe, nCeX405);
                                    const fooArrElementX3229 = UA(fooCalleeParamX11277, fooCalleeParamX11278, fooCalleeParamX11279);
                                    const fooCalleeParamX11280 = [4, fooArrElementX3227, fooArrElementX3229];
                                    const fooReturnArgX5606 = RP$cloneX5(fooCalleeParamX11276, $, fooCalleeParamX11280, PNeX191);
                                    return fooReturnArgX5606;
                                  };
                                  return fooReturnArgX5605;
                                } else {
                                  fooReturnArgX5605 = function ($$0, $$1) {
                                    const nCeX406 = $$0;
                                    const rCeX215 = $$1;
                                    debugger;
                                    const fooCalleeParamX11282 = SSA_bNeX94;
                                    const fooArrElementX3232 = SSA_xNeX108;
                                    const fooCalleeParamX11283 = LNeX86;
                                    const fooCalleeParamX11284 = wNeX70;
                                    const fooCalleeParamX11285 = SP(kNeX164, nCeX406, rCeX215);
                                    const fooArrElementX3234 = UA(fooCalleeParamX11283, fooCalleeParamX11284, fooCalleeParamX11285);
                                    const fooCalleeParamX11286 = [4, fooArrElementX3232, fooArrElementX3234];
                                    const fooReturnArgX5607 = RP$cloneX5(fooCalleeParamX11282, $, fooCalleeParamX11286, PNeX191);
                                    return fooReturnArgX5607;
                                  };
                                  return fooReturnArgX5605;
                                }
                              } else {
                                INeX72 = NNeX135[1];
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
                                    const nCeX408 = $$0;
                                    const rCeX216 = $$1;
                                    debugger;
                                    const fooCalleeParamX11294 = SSA_bNeX94;
                                    const fooArrElementX3242 = SSA_xNeX108;
                                    const fooCalleeParamX11295 = jNeX68;
                                    const fooCalleeParamX11296 = SP(kNeX164, zAe, rCeX216);
                                    const fooArrElementX3244 = UA(fooCalleeParamX11295, nCeX408, fooCalleeParamX11296);
                                    const fooCalleeParamX11297 = [4, fooArrElementX3242, fooArrElementX3244];
                                    const fooReturnArgX5610 = RP$cloneX5(fooCalleeParamX11294, $, fooCalleeParamX11297, PNeX191);
                                    return fooReturnArgX5610;
                                  };
                                  return fooReturnArgX5609;
                                } else {
                                  fooReturnArgX5609 = function ($$0, $$1, $$2) {
                                    const nCeX409 = $$0;
                                    const rCeX217 = $$1;
                                    const sCeX129 = $$2;
                                    debugger;
                                    const fooCalleeParamX11299 = SSA_bNeX94;
                                    const fooArrElementX3247 = SSA_xNeX108;
                                    const fooCalleeParamX11300 = jNeX68;
                                    const fooCalleeParamX11301 = SP(kNeX164, rCeX217, sCeX129);
                                    const fooArrElementX3249 = UA(fooCalleeParamX11300, nCeX409, fooCalleeParamX11301);
                                    const fooCalleeParamX11302 = [4, fooArrElementX3247, fooArrElementX3249];
                                    const fooReturnArgX5611 = RP$cloneX5(fooCalleeParamX11299, $, fooCalleeParamX11302, PNeX191);
                                    return fooReturnArgX5611;
                                  };
                                  return fooReturnArgX5609;
                                }
                              } else {
                                RNeX72 = NNeX135[1];
                                return fooReturnArgX5598;
                              }
                            }
                          }
                        } else {
                          const fooIfTestX13145 = fooSwitchCaseToStartX352 <= 9;
                          if (fooIfTestX13145) {
                            DNeX65 = SSA_SNeX76[1];
                            return fooReturnArgX5613;
                          } else {
                            const fooIfTestX13146 = fooSwitchCaseToStartX352 <= 10;
                            if (fooIfTestX13146) {
                              SSA_xNeX108 = [7, SSA_xNeX108];
                              SSA_SNeX76 = SSA_SNeX76[1];
                            } else {
                              const fooIfTestX13147 = fooSwitchCaseToStartX352 <= 11;
                              if (fooIfTestX13147) {
                                const fooArrElementX3257 = SSA_xNeX108;
                                const fooArrElementX3259 = SSA_SNeX76[1];
                                SSA_xNeX108 = [2, fooArrElementX3257, fooArrElementX3259];
                                SSA_SNeX76 = SSA_SNeX76[2];
                              } else {
                                const fooIfTestX13148 = fooSwitchCaseToStartX352 <= 12;
                                if (fooIfTestX13148) {
                                  const fooArrElementX3262 = SSA_xNeX108;
                                  const fooArrElementX3264 = SSA_SNeX76[1];
                                  SSA_xNeX108 = [3, fooArrElementX3262, fooArrElementX3264];
                                  SSA_SNeX76 = SSA_SNeX76[2];
                                } else {
                                  const fooIfTestX13149 = fooSwitchCaseToStartX352 <= 13;
                                  if (fooIfTestX13149) {
                                    MNeX63 = SSA_SNeX76[3];
                                    const ONeX61 = SSA_SNeX76[2];
                                    const YNeX58 = Q_$clone($);
                                    _A(YNeX58, ONeX61);
                                    FNeX55 = TA(YNeX58);
                                    return fooReturnArgX5615;
                                  } else {
                                    const fooIfTestX13150 = fooSwitchCaseToStartX352 <= 14;
                                    if (fooIfTestX13150) {
                                      VNeX53 = SSA_SNeX76[3];
                                      BNeX51 = SSA_SNeX76[2];
                                      return fooReturnArgX5617;
                                    } else {
                                      const fooIfTestX13151 = fooSwitchCaseToStartX352 <= 15;
                                      if (fooIfTestX13151) {
                                        UNeX80 = SSA_SNeX76[1];
                                        return fooReturnArgX5619;
                                      } else {
                                        const fooIfTestX13152 = fooSwitchCaseToStartX352 <= 16;
                                        if (fooIfTestX13152) {
                                          XNeX77 = SSA_SNeX76[1];
                                          return fooReturnArgX5622;
                                        } else {
                                          const fooIfTestX13153 = fooSwitchCaseToStartX352 <= 17;
                                          if (fooIfTestX13153) {
                                            const fooArrElementX3272 = SSA_xNeX108;
                                            const fooArrElementX3274 = SSA_SNeX76[1];
                                            SSA_xNeX108 = [0, fooArrElementX3272, fooArrElementX3274];
                                            SSA_SNeX76 = SSA_SNeX76[2];
                                          } else {
                                            const fooIfTestX13154 = fooSwitchCaseToStartX352 <= 18;
                                            if (fooIfTestX13154) {
                                              const fooReturnArgX5626 = function ($$0, $$1) {
                                                const iCeX155 = $$0;
                                                const oCeX144 = $$1;
                                                debugger;
                                                const fooArrElementX3279 = [1, oCeX144];
                                                const fooCalleeParamX11329 = [1, nCeX415, fooArrElementX3279];
                                                const fooReturnArgX5627 = RP(rCeX222, iCeX155, fooCalleeParamX11329, qNeX60);
                                                return fooReturnArgX5627;
                                              };
                                              const fooReturnArgX5624 = function ($$0, $$1) {
                                                const iCeX154 = $$0;
                                                const oCeX143 = $$1;
                                                debugger;
                                                const fooArrElementX3277 = [0, oCeX143];
                                                const fooCalleeParamX11328 = [1, nCeX415, fooArrElementX3277];
                                                const fooReturnArgX5625 = RP(rCeX222, iCeX154, fooCalleeParamX11328, qNeX60);
                                                return fooReturnArgX5625;
                                              };
                                              const WNeX66 = SSA_SNeX76[1];
                                              const fooBinBothRhsX4247 = WNeX66[0];
                                              const qNeX60 = SSA_SNeX76[2];
                                              const fooAssignRhsPropX413 = WNeX66[1];
                                              const GNeX69 = fooAssignRhsPropX413[1];
                                              const nCeX415 = SSA_xNeX108;
                                              const rCeX222 = SSA_bNeX94;
                                              const fooIfTestX13193 = 0 === fooBinBothRhsX4247;
                                              if (fooIfTestX13193) {
                                                SSA_bNeX94 = fooReturnArgX5624;
                                                SSA_xNeX108 = 0;
                                                SSA_SNeX76 = GNeX69;
                                                break $continue;
                                              } else {
                                                SSA_bNeX94 = fooReturnArgX5626;
                                                SSA_xNeX108 = 0;
                                                SSA_SNeX76 = GNeX69;
                                                break $continue;
                                              }
                                            } else {
                                            }
                                            const fooIfTestX13155 = fooSwitchCaseToStartX352 <= 19;
                                            if (fooIfTestX13155) {
                                              const fooThrowArgX300 = [0, WB, Rq];
                                              throw fooThrowArgX300;
                                            } else {
                                              const fooIfTestX13156 = fooSwitchCaseToStartX352 <= 20;
                                              if (fooIfTestX13156) {
                                                HNeX48 = SSA_SNeX76[3];
                                                ZNeX45 = [8, SSA_xNeX108, Mq];
                                                return fooReturnArgX5628;
                                              } else {
                                                const fooIfTestX13157 = fooSwitchCaseToStartX352 <= 21;
                                                if (fooIfTestX13157) {
                                                  KNeX38 = SSA_SNeX76[2];
                                                  return fooReturnArgX5630;
                                                } else {
                                                  const fooIfTestX13158 = fooSwitchCaseToStartX352 <= 22;
                                                  if (fooIfTestX13158) {
                                                    QNeX102 = SSA_SNeX76[1];
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
                                                          const SSA_fooReturnArgX144 = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX144;
                                                        } else {
                                                          const fooIfTestX13197 = fooSwitchCaseToStartX353 <= 1;
                                                          if (fooIfTestX13197) {
                                                            const SSA_fooReturnArgX145 = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX145;
                                                          } else {
                                                            const fooIfTestX13198 = fooSwitchCaseToStartX353 <= 2;
                                                            if (fooIfTestX13198) {
                                                              const SSA_fooReturnArgX146 = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
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
                                                          const SSA_fooReturnArgX148 = PP$cloneX3$clone(
                                                            $,
                                                            SSA_bNeX94,
                                                            $,
                                                            SSA_xNeX108,
                                                            $NeX101,
                                                          );
                                                          return SSA_fooReturnArgX148;
                                                        } else {
                                                          const fooIfTestX13206 = fooSwitchCaseToStartX354 <= 1;
                                                          if (fooIfTestX13206) {
                                                            const SSA_fooReturnArgX149 = PP$cloneX3$clone(
                                                              $,
                                                              SSA_bNeX94,
                                                              $,
                                                              SSA_xNeX108,
                                                              $NeX101,
                                                            );
                                                            return SSA_fooReturnArgX149;
                                                          } else {
                                                            const fooIfTestX13207 = fooSwitchCaseToStartX354 <= 2;
                                                            if (fooIfTestX13207) {
                                                              const SSA_fooReturnArgX150 = PP$cloneX3$clone(
                                                                $,
                                                                SSA_bNeX94,
                                                                $,
                                                                SSA_xNeX108,
                                                                $NeX101,
                                                              );
                                                              return SSA_fooReturnArgX150;
                                                            } else {
                                                              const fooIfTestX13208 = fooSwitchCaseToStartX354 <= 3;
                                                              if (fooIfTestX13208) {
                                                                const SSA_fooReturnArgX151 = PP$cloneX3$clone(
                                                                  $,
                                                                  SSA_bNeX94,
                                                                  $,
                                                                  SSA_xNeX108,
                                                                  $NeX101,
                                                                );
                                                                return SSA_fooReturnArgX151;
                                                              } else {
                                                                const fooIfTestX13209 = fooSwitchCaseToStartX354 <= 4;
                                                                if (fooIfTestX13209) {
                                                                  const SSA_fooReturnArgX152 = PP$cloneX3$clone(
                                                                    $,
                                                                    SSA_bNeX94,
                                                                    $,
                                                                    SSA_xNeX108,
                                                                    $NeX101,
                                                                  );
                                                                  return SSA_fooReturnArgX152;
                                                                } else {
                                                                  const fooIfTestX13210 = fooSwitchCaseToStartX354 <= 5;
                                                                  if (fooIfTestX13210) {
                                                                    const SSA_fooReturnArgX153 = PP$cloneX3$clone(
                                                                      $,
                                                                      SSA_bNeX94,
                                                                      $,
                                                                      SSA_xNeX108,
                                                                      $NeX101,
                                                                    );
                                                                    return SSA_fooReturnArgX153;
                                                                  } else {
                                                                    const fooIfTestX13211 = fooSwitchCaseToStartX354 <= 6;
                                                                    if (fooIfTestX13211) {
                                                                      const SSA_fooReturnArgX154 = PP$cloneX3$clone(
                                                                        $,
                                                                        SSA_bNeX94,
                                                                        $,
                                                                        SSA_xNeX108,
                                                                        $NeX101,
                                                                      );
                                                                      return SSA_fooReturnArgX154;
                                                                    } else {
                                                                      const fooIfTestX13212 = fooSwitchCaseToStartX354 <= 7;
                                                                      if (fooIfTestX13212) {
                                                                        const SSA_fooReturnArgX155 = PP$cloneX3$clone(
                                                                          $,
                                                                          SSA_bNeX94,
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
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  return b;
};
const d = function($$0,$$1,$$2,$$3,$$4 ) {
  const e = f;
  const g = h;
  const i = j;
  debugger;
  const k = function($$0 ) {
    const l = c;
    debugger;
    const m = [ 5, n, l ];
    const o = RP$cloneX5( p, $, m, q );
    return o;
  };
  const r = function($$0 ) {
    const s = c;
    debugger;
    const t = p;
    const u = n;
    const v = $yX2( Iq, s );
    const w = [ 4, u, v ];
    const x = RP$cloneX5( t, $, w, y );
    return x;
  };
  const z = function() {
    debugger;
    const 01 = RP$cloneX5( p, $, 11, 21 );
    return 01;
  };
  const 31 = function($$0 ) {
    const 41 = c;
    debugger;
    const 51 = [ 6, n, 41 ];
    const 61 = RP$cloneX5( p, $, 51, 71 );
    return 61;
  };
  const 81 = function($$0,$$1 ) {
    const 91 = c;
    const a1 = f;
    debugger;
    const b1 = function($$0 ) {
      const c1 = c;
      debugger;
      const d1 = YE( 91, c1, a1 );
      return d1;
    };
    const e1 = [ 6, n, b1 ];
    const f1 = RP$cloneX5( p, $, e1, g1 );
    return f1;
  };
  let h1 = undefined;
  const i1 = function($$0 ) {
    const j1 = c;
    debugger;
    const k1 = j1[ 1 ];
    const l1 = PA( h1 );
    const m1 = WE( l1 );
    const n1 = YA( k1, m1 );
    const o1 = n1[ 2 ];
    const p1 = typeofo1;
    const q1 = "number" == p1;
    if (q1) {
      const r1 = p;
      const s1 = n;
      const t1 = n1[ 1 ];
      const u1 = ZE( t1, v1 );
      const w1 = RP$cloneX5( r1, $, s1, u1 );
      return w1;
    }
    else {
      throw JAe;
    }
  };
  const x1 = function() {
    debugger;
    const y1 = [ 4, n, z1 ];
    const 02 = RP$cloneX5( p, $, y1, 12 );
    return 02;
  };
  let 22 = undefined;
  const 32 = function($$0 ) {
    const 42 = c;
    debugger;
    let 52 = undefined;
    if (42) {
      52 = TU;
    }
    else {
      52 = _U;
    }
    const 62 = [ 4, n, 52 ];
    const 72 = RP$cloneX5( p, $, 62, 22 );
    return 72;
  };
  const 82 = function($$0,$$1 ) {
    const 92 = c;
    const a2 = f;
    debugger;
    const b2 = p;
    const c2 = n;
    const d2 = e2;
    const f2 = SP( g2, h2, a2 );
    const i2 = UA( d2, 92, f2 );
    const j2 = [ 4, c2, i2 ];
    const k2 = RP$cloneX5( b2, $, j2, l2 );
    return k2;
  };
  const m2 = function($$0 ) {
    const n2 = c;
    debugger;
    const o2 = p;
    const p2 = n;
    const q2 = r2;
    const s2 = t2;
    const u2 = SP( g2, v2, n2 );
    const w2 = UA( q2, s2, u2 );
    const x2 = [ 4, p2, w2 ];
    const y2 = RP$cloneX5( o2, $, x2, l2 );
    return y2;
  };
  const z2 = function($$0 ) {
    const 03 = c;
    debugger;
    const 13 = p;
    const 23 = n;
    const 33 = SP( g2, 43, 03 );
    const 53 = [ 4, 23, 33 ];
    const 63 = RP$cloneX5( 13, $, 53, l2 );
    return 63;
  };
  const 73 = function($$0 ) {
    const 83 = c;
    debugger;
    const 93 = p;
    const a3 = n;
    const b3 = XT( 83 );
    Jq;
    const c3 = __( b3, Jq );
    const d3 = [ 4, a3, c3 ];
    const e3 = RP$cloneX5( 93, $, d3, f3 );
    return e3;
  };
  let g3 = undefined;
  let z1 = undefined;
  let 21 = undefined;
  let v2 = undefined;
  let y = undefined;
  let r2 = undefined;
  let 12 = undefined;
  let l2 = undefined;
  let q = undefined;
  let h2 = undefined;
  let p = e;
  let n = g;
  let f3 = undefined;
  let g1 = undefined;
  let v1 = undefined;
  let 71 = undefined;
  let 11 = undefined;
  const h3 = function($$0 ) {
    const i3 = c;
    debugger;
    const j3 = [ 5, n, i3 ];
    const k3 = RP$cloneX5( p, $, j3, g3 );
    return k3;
  };
  let e2 = undefined;
  let g2 = undefined;
  let 43 = undefined;
  let t2 = undefined;
  let l3 = i;
  while (true) {
    $continue:     {
      const m3 = typeofl3;
      const n3 = "number" == m3;
      if (n3) {
        const o3 = YE$cloneX5( p, $, n );
        return o3;
      }
      else {
        const p3 = l3[ 0 ];
        let q3 = 24;
        const r3 = 0 === p3;
        if (r3) {
          q3 = 0;
        }
        else {
          const s3 = 1 === p3;
          if (s3) {
            q3 = 1;
          }
          else {
            const t3 = 2 === p3;
            if (t3) {
              q3 = 2;
            }
            else {
              const u3 = 3 === p3;
              if (u3) {
                q3 = 3;
              }
              else {
                const v3 = 4 === p3;
                if (v3) {
                  q3 = 4;
                }
                else {
                  const w3 = 5 === p3;
                  if (w3) {
                    q3 = 5;
                  }
                  else {
                    const x3 = 6 === p3;
                    if (x3) {
                      q3 = 6;
                    }
                    else {
                      const y3 = 7 === p3;
                      if (y3) {
                        q3 = 7;
                      }
                      else {
                        const z3 = 8 === p3;
                        if (z3) {
                          q3 = 8;
                        }
                        else {
                          const 04 = 9 === p3;
                          if (04) {
                            q3 = 9;
                          }
                          else {
                            const 14 = 10 === p3;
                            if (14) {
                              q3 = 10;
                            }
                            else {
                              const 24 = 11 === p3;
                              if (24) {
                                q3 = 11;
                              }
                              else {
                                const 34 = 12 === p3;
                                if (34) {
                                  q3 = 12;
                                }
                                else {
                                  const 44 = 13 === p3;
                                  if (44) {
                                    q3 = 13;
                                  }
                                  else {
                                    const 54 = 14 === p3;
                                    if (54) {
                                      q3 = 14;
                                    }
                                    else {
                                      const 64 = 15 === p3;
                                      if (64) {
                                        q3 = 15;
                                      }
                                      else {
                                        const 74 = 16 === p3;
                                        if (74) {
                                          q3 = 16;
                                        }
                                        else {
                                          const 84 = 17 === p3;
                                          if (84) {
                                            q3 = 17;
                                          }
                                          else {
                                            const 94 = 18 === p3;
                                            if (94) {
                                              q3 = 18;
                                            }
                                            else {
                                              const a4 = 19 === p3;
                                              if (a4) {
                                                q3 = 19;
                                              }
                                              else {
                                                const b4 = 20 === p3;
                                                if (b4) {
                                                  q3 = 20;
                                                }
                                                else {
                                                  const c4 = 21 === p3;
                                                  if (c4) {
                                                    q3 = 21;
                                                  }
                                                  else {
                                                    const d4 = 22 === p3;
                                                    if (d4) {
                                                      q3 = 22;
                                                    }
                                                    else {
                                                      const e4 = 23 === p3;
                                                      if (e4) {
                                                        q3 = 23;
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        const f4 = q3 <= 0;
        if (f4) {
          g3 = l3[ 1 ];
          return h3;
        }
        else {
          const g4 = q3 <= 1;
          if (g4) {
            f3 = l3[ 1 ];
            return 73;
          }
          else {
            const h4 = q3 <= 2;
            if (h4) {
              const i4 = l3[ 2 ];
              const j4 = l3[ 1 ];
              const k4 = NP$cloneX2$clone( $, p, $, n, i4, j4, a );
              return k4;
            }
            else {
              const l4 = q3 <= 3;
              if (l4) {
                const m4 = p;
                const n4 = n;
                const o4 = l3[ 2 ];
                const p4 = l3[ 1 ];
                const q4 = NP$cloneX2$clone( $, m4, $, n4, o4, p4, WA );
                return q4;
              }
              else {
                const r4 = q3 <= 4;
                if (r4) {
                  const s4 = p;
                  const t4 = n;
                  const u4 = l3[ 4 ];
                  const v4 = l3[ 2 ];
                  const w4 = l3[ 3 ];
                  const x4 = l3[ 1 ];
                  const y4 = LP$cloneX2$clone( $, s4, $, t4, u4, v4, w4, ZA, x4 );
                  return y4;
                }
                else {
                  const z4 = q3 <= 5;
                  if (z4) {
                    const 05 = p;
                    const 15 = n;
                    const 25 = l3[ 4 ];
                    const 35 = l3[ 2 ];
                    const 45 = l3[ 3 ];
                    const 55 = l3[ 1 ];
                    const 65 = LP$cloneX2$clone( $, 05, $, 15, 25, 35, 45, KA, 55 );
                    return 65;
                  }
                  else {
                    const 75 = q3 <= 6;
                    if (75) {
                      const 85 = p;
                      const 95 = n;
                      const a5 = l3[ 4 ];
                      const b5 = l3[ 2 ];
                      const c5 = l3[ 3 ];
                      const d5 = l3[ 1 ];
                      const e5 = LP$cloneX2$clone( $, 85, $, 95, a5, b5, c5, QA, d5 );
                      return e5;
                    }
                    else {
                      const f5 = q3 <= 7;
                      if (f5) {
                        const g5 = p;
                        const h5 = n;
                        const i5 = l3[ 4 ];
                        const j5 = l3[ 2 ];
                        const k5 = l3[ 3 ];
                        const l5 = l3[ 1 ];
                        const m5 = LP$cloneX2$clone( $, g5, $, h5, i5, j5, k5, $A, l5 );
                        return m5;
                      }
                      else {
                        const n5 = q3 <= 8;
                        if (n5) {
                          l2 = l3[ 4 ];
                          const o5 = l3[ 3 ];
                          const p5 = l3[ 2 ];
                          g2 = l3[ 1 ];
                          const q5 = typeofp5;
                          const r5 = "number" == q5;
                          if (r5) {
                            const s5 = typeofo5;
                            const t5 = "number" == s5;
                            if (t5) {
                              let u5 = undefined;
                              const v5 = 0 === o5;
                              if (v5) {
                                u5 = function($$0 ) {
                                  const w5 = c;
                                  debugger;
                                  const x5 = p;
                                  const y5 = n;
                                  const z5 = SP( g2, zAe, w5 );
                                  const 06 = [ 4, y5, z5 ];
                                  const 16 = RP$cloneX5( x5, $, 06, l2 );
                                  return 16;
                                };
                                return u5;
                              }
                              else {
                                u5 = function($$0,$$1 ) {
                                  const 26 = c;
                                  const 36 = f;
                                  debugger;
                                  const 46 = p;
                                  const 56 = n;
                                  const 66 = SP( g2, 26, 36 );
                                  const 76 = [ 4, 56, 66 ];
                                  const 86 = RP$cloneX5( 46, $, 76, l2 );
                                  return 86;
                                };
                                return u5;
                              }
                            }
                            else {
                              43 = o5[ 1 ];
                              return z2;
                            }
                          }
                          else {
                            const 96 = p5[ 0 ];
                            const a6 = 0 === 96;
                            if (a6) {
                              t2 = p5[ 2 ];
                              r2 = p5[ 1 ];
                              const b6 = typeofo5;
                              const c6 = "number" == b6;
                              if (c6) {
                                let d6 = undefined;
                                const e6 = 0 === o5;
                                if (e6) {
                                  d6 = function($$0 ) {
                                    const f6 = c;
                                    debugger;
                                    const g6 = p;
                                    const h6 = n;
                                    const i6 = r2;
                                    const j6 = t2;
                                    const k6 = SP( g2, zAe, f6 );
                                    const l6 = UA( i6, j6, k6 );
                                    const m6 = [ 4, h6, l6 ];
                                    const n6 = RP$cloneX5( g6, $, m6, l2 );
                                    return n6;
                                  };
                                  return d6;
                                }
                                else {
                                  d6 = function($$0,$$1 ) {
                                    const o6 = c;
                                    const p6 = f;
                                    debugger;
                                    const q6 = p;
                                    const r6 = n;
                                    const s6 = r2;
                                    const t6 = t2;
                                    const u6 = SP( g2, o6, p6 );
                                    const v6 = UA( s6, t6, u6 );
                                    const w6 = [ 4, r6, v6 ];
                                    const x6 = RP$cloneX5( q6, $, w6, l2 );
                                    return x6;
                                  };
                                  return d6;
                                }
                              }
                              else {
                                v2 = o5[ 1 ];
                                return m2;
                              }
                            }
                            else {
                              e2 = p5[ 1 ];
                              const y6 = typeofo5;
                              const z6 = "number" == y6;
                              if (z6) {
                                let 07 = undefined;
                                const 17 = 0 === o5;
                                if (17) {
                                  07 = function($$0,$$1 ) {
                                    const 27 = c;
                                    const 37 = f;
                                    debugger;
                                    const 47 = p;
                                    const 57 = n;
                                    const 67 = e2;
                                    const 77 = SP( g2, zAe, 37 );
                                    const 87 = UA( 67, 27, 77 );
                                    const 97 = [ 4, 57, 87 ];
                                    const a7 = RP$cloneX5( 47, $, 97, l2 );
                                    return a7;
                                  };
                                  return 07;
                                }
                                else {
                                  07 = function($$0,$$1,$$2 ) {
                                    const b7 = c;
                                    const c7 = f;
                                    const d7 = e7;
                                    debugger;
                                    const f7 = p;
                                    const g7 = n;
                                    const h7 = e2;
                                    const i7 = SP( g2, c7, d7 );
                                    const j7 = UA( h7, b7, i7 );
                                    const k7 = [ 4, g7, j7 ];
                                    const l7 = RP$cloneX5( f7, $, k7, l2 );
                                    return l7;
                                  };
                                  return 07;
                                }
                              }
                              else {
                                h2 = o5[ 1 ];
                                return 82;
                              }
                            }
                          }
                        }
                        else {
                          const m7 = q3 <= 9;
                          if (m7) {
                            22 = l3[ 1 ];
                            return 32;
                          }
                          else {
                            const n7 = q3 <= 10;
                            if (n7) {
                              n = [ 7, n ];
                              l3 = l3[ 1 ];
                            }
                            else {
                              const o7 = q3 <= 11;
                              if (o7) {
                                const p7 = n;
                                const q7 = l3[ 1 ];
                                n = [ 2, p7, q7 ];
                                l3 = l3[ 2 ];
                              }
                              else {
                                const r7 = q3 <= 12;
                                if (r7) {
                                  const s7 = n;
                                  const t7 = l3[ 1 ];
                                  n = [ 3, s7, t7 ];
                                  l3 = l3[ 2 ];
                                }
                                else {
                                  const u7 = q3 <= 13;
                                  if (u7) {
                                    12 = l3[ 3 ];
                                    const v7 = l3[ 2 ];
                                    const w7 = Q_$clone( $ );
                                    _A( w7, v7 );
                                    z1 = TA( w7 );
                                    return x1;
                                  }
                                  else {
                                    const x7 = q3 <= 14;
                                    if (x7) {
                                      v1 = l3[ 3 ];
                                      h1 = l3[ 2 ];
                                      return i1;
                                    }
                                    else {
                                      const y7 = q3 <= 15;
                                      if (y7) {
                                        g1 = l3[ 1 ];
                                        return 81;
                                      }
                                      else {
                                        const z7 = q3 <= 16;
                                        if (z7) {
                                          71 = l3[ 1 ];
                                          return 31;
                                        }
                                        else {
                                          const 08 = q3 <= 17;
                                          if (08) {
                                            const 18 = n;
                                            const 28 = l3[ 1 ];
                                            n = [ 0, 18, 28 ];
                                            l3 = l3[ 2 ];
                                          }
                                          else {
                                            const 38 = q3 <= 18;
                                            if (38) {
                                              const 48 = function($$0,$$1 ) {
                                                const 58 = c;
                                                const 68 = f;
                                                debugger;
                                                const 78 = [ 1, 68 ];
                                                const 88 = [ 1, 98, 78 ];
                                                const a8 = RP( b8, 58, 88, c8 );
                                                return a8;
                                              };
                                              const d8 = function($$0,$$1 ) {
                                                const e8 = c;
                                                const f8 = f;
                                                debugger;
                                                const g8 = [ 0, f8 ];
                                                const h8 = [ 1, 98, g8 ];
                                                const i8 = RP( b8, e8, h8, c8 );
                                                return i8;
                                              };
                                              const j8 = l3[ 1 ];
                                              const k8 = j8[ 0 ];
                                              const c8 = l3[ 2 ];
                                              const l8 = j8[ 1 ];
                                              const m8 = l8[ 1 ];
                                              const 98 = n;
                                              const b8 = p;
                                              const n8 = 0 === k8;
                                              if (n8) {
                                                p = d8;
                                                n = 0;
                                                l3 = m8;
                                                break $continue;
                                              }
                                              else {
                                                p = 48;
                                                n = 0;
                                                l3 = m8;
                                                break $continue;
                                              }
                                            }
                                            const o8 = q3 <= 19;
                                            if (o8) {
                                              const p8 = [ 0, WB, Rq ];
                                              throw p8;
                                            }
                                            else {
                                              const q8 = q3 <= 20;
                                              if (q8) {
                                                21 = l3[ 3 ];
                                                11 = [ 8, n, Mq ];
                                                return z;
                                              }
                                              else {
                                                const r8 = q3 <= 21;
                                                if (r8) {
                                                  y = l3[ 2 ];
                                                  return r;
                                                }
                                                else {
                                                  const s8 = q3 <= 22;
                                                  if (s8) {
                                                    q = l3[ 1 ];
                                                    return k;
                                                  }
                                                  else {
                                                    const t8 = q3 <= 23;
                                                    if (t8) {
                                                      const u8 = l3[ 2 ];
                                                      const v8 = l3[ 1 ];
                                                      const w8 = typeofv8;
                                                      const x8 = "number" == w8;
                                                      if (x8) {
                                                        let y8 = 4;
                                                        const z8 = 0 === v8;
                                                        if (z8) {
                                                          y8 = 0;
                                                        }
                                                        else {
                                                          const 09 = 1 === v8;
                                                          if (09) {
                                                            y8 = 1;
                                                          }
                                                          else {
                                                            const 19 = 2 === v8;
                                                            if (19) {
                                                              y8 = 2;
                                                            }
                                                            else {
                                                              const 29 = 3 === v8;
                                                              if (29) {
                                                                y8 = 3;
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const 39 = y8 <= 0;
                                                        if (39) {
                                                          const 49 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                          return 49;
                                                        }
                                                        else {
                                                          const 59 = y8 <= 1;
                                                          if (59) {
                                                            const 69 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                            return 69;
                                                          }
                                                          else {
                                                            const 79 = y8 <= 2;
                                                            if (79) {
                                                              const 89 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                              return 89;
                                                            }
                                                            else {
                                                              const 99 = y8 <= 3;
                                                              if (99) {
                                                                const a9 = [ 0, WB, Oq ];
                                                                throw a9;
                                                              }
                                                              else {
                                                                const b9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                return b9;
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                      else {
                                                        const c9 = v8[ 0 ];
                                                        let d9 = 10;
                                                        const e9 = 0 === c9;
                                                        if (e9) {
                                                          d9 = 0;
                                                        }
                                                        else {
                                                          const f9 = 1 === c9;
                                                          if (f9) {
                                                            d9 = 1;
                                                          }
                                                          else {
                                                            const g9 = 2 === c9;
                                                            if (g9) {
                                                              d9 = 2;
                                                            }
                                                            else {
                                                              const h9 = 3 === c9;
                                                              if (h9) {
                                                                d9 = 3;
                                                              }
                                                              else {
                                                                const i9 = 4 === c9;
                                                                if (i9) {
                                                                  d9 = 4;
                                                                }
                                                                else {
                                                                  const j9 = 5 === c9;
                                                                  if (j9) {
                                                                    d9 = 5;
                                                                  }
                                                                  else {
                                                                    const k9 = 6 === c9;
                                                                    if (k9) {
                                                                      d9 = 6;
                                                                    }
                                                                    else {
                                                                      const l9 = 7 === c9;
                                                                      if (l9) {
                                                                        d9 = 7;
                                                                      }
                                                                      else {
                                                                        const m9 = 8 === c9;
                                                                        if (m9) {
                                                                          d9 = 8;
                                                                        }
                                                                        else {
                                                                          const n9 = 9 === c9;
                                                                          if (n9) {
                                                                            d9 = 9;
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                        const o9 = d9 <= 0;
                                                        if (o9) {
                                                          const p9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                          return p9;
                                                        }
                                                        else {
                                                          const q9 = d9 <= 1;
                                                          if (q9) {
                                                            const r9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                            return r9;
                                                          }
                                                          else {
                                                            const s9 = d9 <= 2;
                                                            if (s9) {
                                                              const t9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                              return t9;
                                                            }
                                                            else {
                                                              const u9 = d9 <= 3;
                                                              if (u9) {
                                                                const v9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                return v9;
                                                              }
                                                              else {
                                                                const w9 = d9 <= 4;
                                                                if (w9) {
                                                                  const x9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                  return x9;
                                                                }
                                                                else {
                                                                  const y9 = d9 <= 5;
                                                                  if (y9) {
                                                                    const z9 = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                    return z9;
                                                                  }
                                                                  else {
                                                                    const 0a = d9 <= 6;
                                                                    if (0a) {
                                                                      const 1a = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                      return 1a;
                                                                    }
                                                                    else {
                                                                      const 2a = d9 <= 7;
                                                                      if (2a) {
                                                                        const 3a = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                        return 3a;
                                                                      }
                                                                      else {
                                                                        const 4a = d9 <= 8;
                                                                        if (4a) {
                                                                          const 5a = p;
                                                                          const 6a = n;
                                                                          const 7a = v8[ 2 ];
                                                                          const 8a = _P$cloneX4$clone( $, 5a, $, 6a, 7a, u8 );
                                                                          return 8a;
                                                                        }
                                                                        else {
                                                                          const 9a = PP$cloneX3$clone( $, p, $, n, u8 );
                                                                          return 9a;
                                                                        }
                                                                      }
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
                                                      const aa = l3[ 3 ];
                                                      const ba = l3[ 1 ];
                                                      const ca = p;
                                                      const da = n;
                                                      const ea = l3[ 2 ];
                                                      const fa = OE$clone( ea, $ );
                                                      const ga = IP$cloneX3$cloneX1( $, ca, $, da, aa, ba, fa );
                                                      return ga;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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

## Globals

BAD@! Found 37 implicit global bindings:

RP$cloneX5, $yX2, Iq, YE, PA, WE, YA, ZE, JAe, TU, _U, SP, UA, XT, Jq, __, YE$cloneX5, NP$cloneX2$clone, WA, LP$cloneX2$clone, ZA, KA, QA, $A, zAe, Q_$clone, _A, TA, RP, WB, Rq, Mq, PP$cloneX3$clone, Oq, _P$cloneX4$clone, OE$clone, IP$cloneX3$cloneX1

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
