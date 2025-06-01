# Preval test case

# nested_shortcircuit.md

> Ai > Ai5 > Nested shortcircuit
>
> Test nested short-circuiting and complex boolean logic

## Input

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);

let result = 0;

if ((x === 1 && y === 2) || (x === 2 && y === 1)) {
    if (z === 3 || (x === 1 && y === 2)) {
        if (x === 1 && (y === 2 || z === 3)) {
            result = 1;
        } else if (x === 2 && y === 1 && z === 3) {
            result = 2;
        }
    } else if (x === 2 && y === 1 && z === 3) {
        result = 3;
    }
} else if (x === 2 && y === 1 && z === 3) {
    result = 4;
}

$(result);

// Expected:
// const x = $(1);
// const y = $(2);
// const z = $(3);
// let result = 0;
// if ((x === 1 && y === 2) || (x === 2 && y === 1)) {
//     if (z === 3 || (x === 1 && y === 2)) {
//         if (x === 1 && (y === 2 || z === 3)) {
//             result = 1;
//         } else if (x === 2 && y === 1 && z === 3) {
//             result = 2;
//         }
//     } else if (x === 2 && y === 1 && z === 3) {
//         result = 3;
//     }
// } else if (x === 2 && y === 1 && z === 3) {
//     result = 4;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(2);
const z /*:unknown*/ = $(3);
let tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
} else {
}
if (tmpIfTest) {
} else {
  tmpIfTest = x === 2;
  if (tmpIfTest) {
    tmpIfTest = y === 1;
  } else {
  }
}
if (tmpIfTest) {
  let tmpIfTest$1 /*:boolean*/ = z === 3;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = x === 1;
    if (tmpIfTest$1) {
      tmpIfTest$1 = y === 2;
    } else {
    }
  }
  if (tmpIfTest$1) {
    let tmpIfTest$3 /*:boolean*/ = x === 1;
    if (tmpIfTest$3) {
      tmpIfTest$3 = y === 2;
      if (tmpIfTest$3) {
      } else {
        tmpIfTest$3 = z === 3;
      }
    } else {
    }
    if (tmpIfTest$3) {
      $(1);
    } else {
      const tmpIfTest$5 /*:boolean*/ = x === 2;
      if (tmpIfTest$5) {
        const tmpClusterSSA_tmpIfTest$5 /*:boolean*/ = y === 1;
        if (tmpClusterSSA_tmpIfTest$5) {
          const tmpClusterSSA_tmpIfTest$1 /*:boolean*/ = z === 3;
          if (tmpClusterSSA_tmpIfTest$1) {
            $(2);
          } else {
            $(0);
          }
        } else {
          $(0);
        }
      } else {
        $(0);
      }
    }
  } else {
    const tmpIfTest$7 /*:boolean*/ = x === 2;
    if (tmpIfTest$7) {
      const tmpClusterSSA_tmpIfTest$7 /*:boolean*/ = y === 1;
      if (tmpClusterSSA_tmpIfTest$7) {
        const tmpClusterSSA_tmpIfTest$3 /*:boolean*/ = z === 3;
        if (tmpClusterSSA_tmpIfTest$3) {
          $(3);
        } else {
          $(0);
        }
      } else {
        $(0);
      }
    } else {
      $(0);
    }
  }
} else {
  const tmpIfTest$9 /*:boolean*/ = x === 2;
  if (tmpIfTest$9) {
    const tmpClusterSSA_tmpIfTest$9 /*:boolean*/ = y === 1;
    if (tmpClusterSSA_tmpIfTest$9) {
      const tmpClusterSSA_tmpIfTest$6 /*:boolean*/ = z === 3;
      if (tmpClusterSSA_tmpIfTest$6) {
        $(4);
      } else {
        $(0);
      }
    } else {
      $(0);
    }
  } else {
    $(0);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);
let tmpIfTest = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
}
if (!tmpIfTest) {
  tmpIfTest = x === 2;
  if (tmpIfTest) {
    tmpIfTest = y === 1;
  }
}
if (tmpIfTest) {
  let tmpIfTest$1 = z === 3;
  if (!tmpIfTest$1) {
    tmpIfTest$1 = x === 1;
    if (tmpIfTest$1) {
      tmpIfTest$1 = y === 2;
    }
  }
  if (tmpIfTest$1) {
    let tmpIfTest$3 = x === 1;
    if (tmpIfTest$3) {
      tmpIfTest$3 = y === 2;
      if (!tmpIfTest$3) {
        tmpIfTest$3 = z === 3;
      }
    }
    if (tmpIfTest$3) {
      $(1);
    } else {
      if (x === 2) {
        if (y === 1) {
          if (z === 3) {
            $(2);
          } else {
            $(0);
          }
        } else {
          $(0);
        }
      } else {
        $(0);
      }
    }
  } else {
    if (x === 2) {
      if (y === 1) {
        if (z === 3) {
          $(3);
        } else {
          $(0);
        }
      } else {
        $(0);
      }
    } else {
      $(0);
    }
  }
} else {
  if (x === 2) {
    if (y === 1) {
      if (z === 3) {
        $(4);
      } else {
        $(0);
      }
    } else {
      $(0);
    }
  } else {
    $(0);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( 3 );
let d = a === 1;
if (d) {
  d = b === 2;
}
if (d) {

}
else {
  d = a === 2;
  if (d) {
    d = b === 1;
  }
}
if (d) {
  let e = c === 3;
  if (e) {

  }
  else {
    e = a === 1;
    if (e) {
      e = b === 2;
    }
  }
  if (e) {
    let f = a === 1;
    if (f) {
      f = b === 2;
      if (f) {

      }
      else {
        f = c === 3;
      }
    }
    if (f) {
      $( 1 );
    }
    else {
      const g = a === 2;
      if (g) {
        const h = b === 1;
        if (h) {
          const i = c === 3;
          if (i) {
            $( 2 );
          }
          else {
            $( 0 );
          }
        }
        else {
          $( 0 );
        }
      }
      else {
        $( 0 );
      }
    }
  }
  else {
    const j = a === 2;
    if (j) {
      const k = b === 1;
      if (k) {
        const l = c === 3;
        if (l) {
          $( 3 );
        }
        else {
          $( 0 );
        }
      }
      else {
        $( 0 );
      }
    }
    else {
      $( 0 );
    }
  }
}
else {
  const m = a === 2;
  if (m) {
    const n = b === 1;
    if (n) {
      const o = c === 3;
      if (o) {
        $( 4 );
      }
      else {
        $( 0 );
      }
    }
    else {
      $( 0 );
    }
  }
  else {
    $( 0 );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);
let result = 0;
let tmpIfTest = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
} else {
}
if (tmpIfTest) {
} else {
  tmpIfTest = x === 2;
  if (tmpIfTest) {
    tmpIfTest = y === 1;
  } else {
  }
}
if (tmpIfTest) {
  let tmpIfTest$1 = z === 3;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = x === 1;
    if (tmpIfTest$1) {
      tmpIfTest$1 = y === 2;
    } else {
    }
  }
  if (tmpIfTest$1) {
    let tmpIfTest$3 = x === 1;
    if (tmpIfTest$3) {
      tmpIfTest$3 = y === 2;
      if (tmpIfTest$3) {
      } else {
        tmpIfTest$3 = z === 3;
      }
    } else {
    }
    if (tmpIfTest$3) {
      result = 1;
      $(result);
    } else {
      let tmpIfTest$5 = x === 2;
      if (tmpIfTest$5) {
        tmpIfTest$5 = y === 1;
        if (tmpIfTest$5) {
          tmpIfTest$5 = z === 3;
          if (tmpIfTest$5) {
            result = 2;
            $(result);
          } else {
            $(result);
          }
        } else {
          $(result);
        }
      } else {
        $(result);
      }
    }
  } else {
    let tmpIfTest$7 = x === 2;
    if (tmpIfTest$7) {
      tmpIfTest$7 = y === 1;
      if (tmpIfTest$7) {
        tmpIfTest$7 = z === 3;
        if (tmpIfTest$7) {
          result = 3;
          $(result);
        } else {
          $(result);
        }
      } else {
        $(result);
      }
    } else {
      $(result);
    }
  }
} else {
  let tmpIfTest$9 = x === 2;
  if (tmpIfTest$9) {
    tmpIfTest$9 = y === 1;
    if (tmpIfTest$9) {
      tmpIfTest$9 = z === 3;
      if (tmpIfTest$9) {
        result = 4;
        $(result);
      } else {
        $(result);
      }
    } else {
      $(result);
    }
  } else {
    $(result);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
