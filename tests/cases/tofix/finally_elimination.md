# Preval test case

# finally_elimination.md

> Tofix > Finally elimination
>
> We probably want to eliminate finally?

#TODO

## Input

`````js filename=intro
// Consider a silly try with a bunch of abrupt completions.
function f() {
  ABC: while (true) {
    try {
      $(a);
      if ($1) {
        break ABC;
      }
      if ($2) {
        return value;
      }
      if ($3) {
        throw x;
      }
      if ($4) {
        continue ABC;
      }
    } finally {
      $(b);
    }
  }
}
$(f);

// into ->

/*
let action = 0;
let use = undefined;
ABC: while (true)
A: try {
  $(a);
  if ($1) {
    action = 1;
    break A
  }
  if ($2) {
    action = 2;
    use = value;
    break A
  }
  if ($3) {
    action = 3;
    use = x;
    break A
  }
  if ($4) {
    action = 4;
    break A
  }
} catch (e) {
  action = 5;
  use = e;
}

// Finally code here
$(b);

// Transformed continuations (esp. labels)
if (action === 1) break ABC;
if (action === 2) return use;
if (action === 3) throw use;
if (action === 4) continue ABC;
if (action === 5) throw use;
*/
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  ABC: while (true) {
    try {
      $(a);
      if ($1) {
        break ABC;
      }
      if ($2) {
        return value;
      }
      if ($3) {
        throw x;
      }
      if ($4) {
        continue ABC;
      }
    } finally {
      $(b);
    }
  }
};
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    try {
      $(a);
      if ($1) {
        break;
      } else {
        if ($2) {
          return value;
        } else {
          if ($3) {
            throw x;
          } else {
            if ($4) {
              continue;
            } else {
            }
          }
        }
      }
    } finally {
      $(b);
    }
  }
  return undefined;
};
$(f);
`````

## Output

`````js filename=intro
const tmpAfterLabel = function ($$0) {
  const $tmpLoopUnrollCheck$1 = $$0;
  debugger;
  if ($tmpLoopUnrollCheck$1) {
    while ($LOOP_UNROLL_10) {
      try {
        $(a);
        if ($1) {
          break;
        } else {
          if ($2) {
            return value;
          } else {
            if ($3) {
              throw x;
            } else {
              $4;
            }
          }
        }
      } finally {
        $(b);
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  let $tmpLoopUnrollCheck = true;
  try {
    $(a);
    if ($1) {
      $tmpLoopUnrollCheck = false;
      const tmpReturnArg = tmpAfterLabel(false);
      return tmpReturnArg;
    } else {
      if ($2) {
        return value;
      } else {
        if ($3) {
          throw x;
        } else {
          $4;
        }
      }
    }
  } finally {
    $(b);
  }
  const tmpReturnArg$1 = tmpAfterLabel($tmpLoopUnrollCheck);
  return tmpReturnArg$1;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  if (b) {
    while ($LOOP_UNROLL_10) {
      try {
        $( a );
        if ($1) {
          break;
        }
        else {
          if ($2) {
            return value;
          }
          else {
            if ($3) {
              throw x;
            }
            else {
              $4;
            }
          }
        }
      }
finally {
        $( b );
      }
    }
    return undefined;
  }
  else {
    return undefined;
  }
};
const d = function() {
  debugger;
  let e = true;
  try {
    $( a );
    if ($1) {
      e = false;
      const f = a( false );
      return f;
    }
    else {
      if ($2) {
        return value;
      }
      else {
        if ($3) {
          throw x;
        }
        else {
          $4;
        }
      }
    }
  }
finally {
    $( b );
  }
  const g = a( e );
  return g;
};
$( d );
`````

## Globals

BAD@! Found 8 implicit global bindings:

a, $1, $2, value, $3, x, $4, b

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
