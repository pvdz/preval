# Preval test case

# base_lt_yes.md

> Value set > Base lt yes
>
> If we know all the values a binding can have then we can resolve certain ops...

#TODO

## Input

`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $('must be 11');
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  
if (n <= 11) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $(`must be 11`);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
if (n <= 11) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $(`must be 11`);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
const tmpIfTest = n <= 11;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const x = $();
let t = 0 === x;
if (t) {
} else {
  t = 1 === x;
  if (t) {
  } else {
    t = 2 === x;
    if (t) {
    } else {
      t = 3 === x;
      if (t) {
      } else {
        t = 4 === x;
        if (t) {
        } else {
          t = 5 === x;
          if (t) {
          } else {
            t = 6 === x;
            if (t) {
            } else {
              t = 7 === x;
              if (t) {
              } else {
                t = 8 === x;
                if (t) {
                } else {
                  t = 10 === x;
                  if (t) {
                  } else {
                    t = 9 === x;
                    if (t) {
                    } else {
                      $(`must be 11`);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
let b = 0 === a;
if (b) {

}
else {
  b = 1 === a;
  if (b) {

  }
  else {
    b = 2 === a;
    if (b) {

    }
    else {
      b = 3 === a;
      if (b) {

      }
      else {
        b = 4 === a;
        if (b) {

        }
        else {
          b = 5 === a;
          if (b) {

          }
          else {
            b = 6 === a;
            if (b) {

            }
            else {
              b = 7 === a;
              if (b) {

              }
              else {
                b = 8 === a;
                if (b) {

                }
                else {
                  b = 10 === a;
                  if (b) {

                  }
                  else {
                    b = 9 === a;
                    if (b) {

                    }
                    else {
                      $( "must be 11" );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'must be 11'
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
