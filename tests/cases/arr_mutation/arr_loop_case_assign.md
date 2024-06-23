# Preval test case

# arr_loop_case_assign.md

> Arr mutation > Arr loop case assign
>
>

## Input

`````js filename=intro
const arr = [
  `one`,
  `two`,
  `three`,
  `four`,
  `five`,
];
while (true) {
  $(1);
  let test;
  try {
    test = arr[2] === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      $(arr.slice(0));
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(test);
}

$(arr.slice(0, 3));
`````

## Pre Normal


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  let test;
  try {
    test = arr[2] === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      $(arr.slice(0));
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(test);
}
$(arr.slice(0, 3));
`````

## Normalized


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  let test = undefined;
  try {
    const tmpBinLhs = arr[2];
    test = tmpBinLhs === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      const tmpCallCallee = $;
      const tmpCalleeParam = arr.slice(0);
      tmpCallCallee(tmpCalleeParam);
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(test);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr.slice(0, 3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(1);
const arr = [`two`, `three`, `four`, `five`, `one`];
loopStop$1: {
  try {
    const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
    $(tmpCalleeParam);
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(false);
  $(1);
  let test$1 = undefined;
  loopStop: {
    try {
      const tmpBinLhs$1 = arr[2];
      test$1 = tmpBinLhs$1 === 820304;
      if (test$1) {
        break loopStop$1;
      } else {
        const next$1 = arr.shift();
        arr.push(next$1);
        const tmpCalleeParam$2 = arr.slice(0);
        $(tmpCalleeParam$2);
      }
    } catch (e$1) {
      const v$1 = arr.shift();
      arr.push(v$1);
    }
    $(test$1);
    $(1);
    let test$2 = undefined;
    loopStop$2: {
      try {
        const tmpBinLhs$2 = arr[2];
        test$2 = tmpBinLhs$2 === 820304;
        if (test$2) {
          break loopStop;
        } else {
          const next$2 = arr.shift();
          arr.push(next$2);
          const tmpCalleeParam$3 = arr.slice(0);
          $(tmpCalleeParam$3);
        }
      } catch (e$2) {
        const v$2 = arr.shift();
        arr.push(v$2);
      }
      $(test$2);
      $(1);
      let test$3 = undefined;
      loopStop$3: {
        try {
          const tmpBinLhs$3 = arr[2];
          test$3 = tmpBinLhs$3 === 820304;
          if (test$3) {
            break loopStop$2;
          } else {
            const next$3 = arr.shift();
            arr.push(next$3);
            const tmpCalleeParam$4 = arr.slice(0);
            $(tmpCalleeParam$4);
          }
        } catch (e$3) {
          const v$3 = arr.shift();
          arr.push(v$3);
        }
        $(test$3);
        $(1);
        let test$4 = undefined;
        loopStop$4: {
          try {
            const tmpBinLhs$4 = arr[2];
            test$4 = tmpBinLhs$4 === 820304;
            if (test$4) {
              break loopStop$3;
            } else {
              const next$4 = arr.shift();
              arr.push(next$4);
              const tmpCalleeParam$5 = arr.slice(0);
              $(tmpCalleeParam$5);
            }
          } catch (e$4) {
            const v$4 = arr.shift();
            arr.push(v$4);
          }
          $(test$4);
          $(1);
          let test$5 = undefined;
          loopStop$5: {
            try {
              const tmpBinLhs$5 = arr[2];
              test$5 = tmpBinLhs$5 === 820304;
              if (test$5) {
                break loopStop$4;
              } else {
                const next$5 = arr.shift();
                arr.push(next$5);
                const tmpCalleeParam$6 = arr.slice(0);
                $(tmpCalleeParam$6);
              }
            } catch (e$5) {
              const v$5 = arr.shift();
              arr.push(v$5);
            }
            $(test$5);
            $(1);
            let test$6 = undefined;
            loopStop$6: {
              try {
                const tmpBinLhs$6 = arr[2];
                test$6 = tmpBinLhs$6 === 820304;
                if (test$6) {
                  break loopStop$5;
                } else {
                  const next$6 = arr.shift();
                  arr.push(next$6);
                  const tmpCalleeParam$7 = arr.slice(0);
                  $(tmpCalleeParam$7);
                }
              } catch (e$6) {
                const v$6 = arr.shift();
                arr.push(v$6);
              }
              $(test$6);
              $(1);
              let test$7 = undefined;
              loopStop$7: {
                try {
                  const tmpBinLhs$7 = arr[2];
                  test$7 = tmpBinLhs$7 === 820304;
                  if (test$7) {
                    break loopStop$6;
                  } else {
                    const next$7 = arr.shift();
                    arr.push(next$7);
                    const tmpCalleeParam$8 = arr.slice(0);
                    $(tmpCalleeParam$8);
                  }
                } catch (e$7) {
                  const v$7 = arr.shift();
                  arr.push(v$7);
                }
                $(test$7);
                $(1);
                let test$8 = undefined;
                loopStop$8: {
                  try {
                    const tmpBinLhs$8 = arr[2];
                    test$8 = tmpBinLhs$8 === 820304;
                    if (test$8) {
                      break loopStop$7;
                    } else {
                      const next$8 = arr.shift();
                      arr.push(next$8);
                      const tmpCalleeParam$9 = arr.slice(0);
                      $(tmpCalleeParam$9);
                    }
                  } catch (e$8) {
                    const v$8 = arr.shift();
                    arr.push(v$8);
                  }
                  $(test$8);
                  $(1);
                  let test$9 = undefined;
                  loopStop$9: {
                    try {
                      const tmpBinLhs$9 = arr[2];
                      test$9 = tmpBinLhs$9 === 820304;
                      if (test$9) {
                        break loopStop$8;
                      } else {
                        const next$9 = arr.shift();
                        arr.push(next$9);
                        const tmpCalleeParam$10 = arr.slice(0);
                        $(tmpCalleeParam$10);
                      }
                    } catch (e$9) {
                      const v$9 = arr.shift();
                      arr.push(v$9);
                    }
                    $(test$9);
                    $(1);
                    let test$10 = undefined;
                    try {
                      const tmpBinLhs$10 = arr[2];
                      test$10 = tmpBinLhs$10 === 820304;
                      if (test$10) {
                        break loopStop$9;
                      } else {
                        const next$10 = arr.shift();
                        arr.push(next$10);
                        const tmpCalleeParam$11 = arr.slice(0);
                        $(tmpCalleeParam$11);
                      }
                    } catch (e$10) {
                      const v$10 = arr.shift();
                      arr.push(v$10);
                    }
                    $(test$10);
                    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                      $(1);
                      let test$11 = undefined;
                      try {
                        const tmpBinLhs$11 = arr[2];
                        test$11 = tmpBinLhs$11 === 820304;
                        if (test$11) {
                          break;
                        } else {
                          const next$11 = arr.shift();
                          arr.push(next$11);
                          const tmpCalleeParam$12 = arr.slice(0);
                          $(tmpCalleeParam$12);
                        }
                      } catch (e$11) {
                        const v$11 = arr.shift();
                        arr.push(v$11);
                      }
                      $(test$11);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
const tmpCalleeParam$1 = arr.slice(0, 3);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = [ "two", "three", "four", "five", "one" ];
loopStop$1: {
  try {
    const b = [ "two", "three", "four", "five", "one" ];
    $( b );
  }
  catch (c) {
    const d = a.shift();
    a.push( d );
  }
  $( false );
  $( 1 );
  let e = undefined;
  loopStop: {
    try {
      const f = a[ 2 ];
      e = f === 820304;
      if (e) {
        break loopStop$1;
      }
      else {
        const g = a.shift();
        a.push( g );
        const h = a.slice( 0 );
        $( h );
      }
    }
    catch (i) {
      const j = a.shift();
      a.push( j );
    }
    $( e );
    $( 1 );
    let k = undefined;
    loopStop$2: {
      try {
        const l = a[ 2 ];
        k = l === 820304;
        if (k) {
          break loopStop;
        }
        else {
          const m = a.shift();
          a.push( m );
          const n = a.slice( 0 );
          $( n );
        }
      }
      catch (o) {
        const p = a.shift();
        a.push( p );
      }
      $( k );
      $( 1 );
      let q = undefined;
      loopStop$3: {
        try {
          const r = a[ 2 ];
          q = r === 820304;
          if (q) {
            break loopStop$2;
          }
          else {
            const s = a.shift();
            a.push( s );
            const t = a.slice( 0 );
            $( t );
          }
        }
        catch (u) {
          const v = a.shift();
          a.push( v );
        }
        $( q );
        $( 1 );
        let w = undefined;
        loopStop$4: {
          try {
            const x = a[ 2 ];
            w = x === 820304;
            if (w) {
              break loopStop$3;
            }
            else {
              const y = a.shift();
              a.push( y );
              const z = a.slice( 0 );
              $( z );
            }
          }
          catch (01) {
            const 11 = a.shift();
            a.push( 11 );
          }
          $( w );
          $( 1 );
          let 21 = undefined;
          loopStop$5: {
            try {
              const 31 = a[ 2 ];
              21 = 31 === 820304;
              if (21) {
                break loopStop$4;
              }
              else {
                const 41 = a.shift();
                a.push( 41 );
                const 51 = a.slice( 0 );
                $( 51 );
              }
            }
            catch (61) {
              const 71 = a.shift();
              a.push( 71 );
            }
            $( 21 );
            $( 1 );
            let 81 = undefined;
            loopStop$6: {
              try {
                const 91 = a[ 2 ];
                81 = 91 === 820304;
                if (81) {
                  break loopStop$5;
                }
                else {
                  const a1 = a.shift();
                  a.push( a1 );
                  const b1 = a.slice( 0 );
                  $( b1 );
                }
              }
              catch (c1) {
                const d1 = a.shift();
                a.push( d1 );
              }
              $( 81 );
              $( 1 );
              let e1 = undefined;
              loopStop$7: {
                try {
                  const f1 = a[ 2 ];
                  e1 = f1 === 820304;
                  if (e1) {
                    break loopStop$6;
                  }
                  else {
                    const g1 = a.shift();
                    a.push( g1 );
                    const h1 = a.slice( 0 );
                    $( h1 );
                  }
                }
                catch (i1) {
                  const j1 = a.shift();
                  a.push( j1 );
                }
                $( e1 );
                $( 1 );
                let k1 = undefined;
                loopStop$8: {
                  try {
                    const l1 = a[ 2 ];
                    k1 = l1 === 820304;
                    if (k1) {
                      break loopStop$7;
                    }
                    else {
                      const m1 = a.shift();
                      a.push( m1 );
                      const n1 = a.slice( 0 );
                      $( n1 );
                    }
                  }
                  catch (o1) {
                    const p1 = a.shift();
                    a.push( p1 );
                  }
                  $( k1 );
                  $( 1 );
                  let q1 = undefined;
                  loopStop$9: {
                    try {
                      const r1 = a[ 2 ];
                      q1 = r1 === 820304;
                      if (q1) {
                        break loopStop$8;
                      }
                      else {
                        const s1 = a.shift();
                        a.push( s1 );
                        const t1 = a.slice( 0 );
                        $( t1 );
                      }
                    }
                    catch (u1) {
                      const v1 = a.shift();
                      a.push( v1 );
                    }
                    $( q1 );
                    $( 1 );
                    let w1 = undefined;
                    try {
                      const x1 = a[ 2 ];
                      w1 = x1 === 820304;
                      if (w1) {
                        break loopStop$9;
                      }
                      else {
                        const y1 = a.shift();
                        a.push( y1 );
                        const z1 = a.slice( 0 );
                        $( z1 );
                      }
                    }
                    catch (02) {
                      const 12 = a.shift();
                      a.push( 12 );
                    }
                    $( w1 );
                    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                      $( 1 );
                      let 22 = undefined;
                      try {
                        const 32 = a[ 2 ];
                        22 = 32 === 820304;
                        if (22) {
                          break;
                        }
                        else {
                          const 42 = a.shift();
                          a.push( 42 );
                          const 52 = a.slice( 0 );
                          $( 52 );
                        }
                      }
                      catch (62) {
                        const 72 = a.shift();
                        a.push( 72 );
                      }
                      $( 22 );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
const 82 = a.slice( 0, 3 );
$( 82 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['two', 'three', 'four', 'five', 'one']
 - 3: false
 - 4: 1
 - 5: ['three', 'four', 'five', 'one', 'two']
 - 6: false
 - 7: 1
 - 8: ['four', 'five', 'one', 'two', 'three']
 - 9: false
 - 10: 1
 - 11: ['five', 'one', 'two', 'three', 'four']
 - 12: false
 - 13: 1
 - 14: ['one', 'two', 'three', 'four', 'five']
 - 15: false
 - 16: 1
 - 17: ['two', 'three', 'four', 'five', 'one']
 - 18: false
 - 19: 1
 - 20: ['three', 'four', 'five', 'one', 'two']
 - 21: false
 - 22: 1
 - 23: ['four', 'five', 'one', 'two', 'three']
 - 24: false
 - 25: 1
 - 26: ['five', 'one', 'two', 'three', 'four']
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
