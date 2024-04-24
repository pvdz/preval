# Preval test case

# base_lt_no.md

> Value set > Base lt no
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
  
if (n <= 10) {
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
if (n <= 10) {
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
const tmpIfTest = n <= 10;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

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
const tmpIfTest = n <= 10;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
let b = 11;
let c = 0 === a;
if (c) {
  b = 0;
}
else {
  c = 1 === a;
  if (c) {
    b = 1;
  }
  else {
    c = 2 === a;
    if (c) {
      b = 2;
    }
    else {
      c = 3 === a;
      if (c) {
        b = 3;
      }
      else {
        c = 4 === a;
        if (c) {
          b = 4;
        }
        else {
          c = 5 === a;
          if (c) {
            b = 5;
          }
          else {
            c = 6 === a;
            if (c) {
              b = 6;
            }
            else {
              c = 7 === a;
              if (c) {
                b = 7;
              }
              else {
                c = 8 === a;
                if (c) {
                  b = 8;
                }
                else {
                  c = 10 === a;
                  if (c) {
                    b = 9;
                  }
                  else {
                    c = 9 === a;
                    if (c) {
                      b = 10;
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
const d = b <= 10;
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'must be 11'
 - 3: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
