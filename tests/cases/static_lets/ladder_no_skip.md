# Preval test case

# ladder_no_skip.md

> Static lets > Ladder no skip
>
> A ladder of statements

## Input

`````js filename=intro
function f() {
  // This closure should prevent the var-read optimization
  return x;
}
let x = 10;
$(1);
$(1);
if ($) {
  $(2);
  $(2);
  if ($) {
    $(3);
    if ($) {
      $(4);
      $(4);
      $(4);
      if ($) {
        $(5);
        $(5);
        if ($) {
          if ($) {
            $(6);
            $(6);
            $(6);
            $(6);
            if ($) {
              $(8);
              $(8);
              $(8);
              $(x);
              $(9);
              $(9);
              $(9);
            }
            $(10);
            $(10);
          }
          $(11);
          x = 20;
          $(11);
        }
        $(12);
        $(12);
        $(12);
      }
    }
    $(13);
  }
  $(14);
  $(14);
  $(14);
  $(14);
  $(14);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
let x = 10;
$(1);
$(1);
if ($) {
  $(2);
  $(2);
  if ($) {
    $(3);
    if ($) {
      $(4);
      $(4);
      $(4);
      if ($) {
        $(5);
        $(5);
        if ($) {
          if ($) {
            $(6);
            $(6);
            $(6);
            $(6);
            if ($) {
              $(8);
              $(8);
              $(8);
              $(x);
              $(9);
              $(9);
              $(9);
            }
            $(10);
            $(10);
          }
          $(11);
          x = 20;
          $(11);
        }
        $(12);
        $(12);
        $(12);
      }
    }
    $(13);
  }
  $(14);
  $(14);
  $(14);
  $(14);
  $(14);
}
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
let x = 10;
$(1);
$(1);
if ($) {
  $(2);
  $(2);
  if ($) {
    $(3);
    if ($) {
      $(4);
      $(4);
      $(4);
      if ($) {
        $(5);
        $(5);
        if ($) {
          $(6);
          $(6);
          $(6);
          $(6);
          if ($) {
            $(8);
            $(8);
            $(8);
            $(x);
            $(9);
            $(9);
            $(9);
          } else {
          }
          $(10);
          $(10);
          $(11);
          x = 20;
          $(11);
        } else {
        }
        $(12);
        $(12);
        $(12);
      } else {
      }
    } else {
    }
    $(13);
  } else {
  }
  $(14);
  $(14);
  $(14);
  $(14);
  $(14);
} else {
}
$(x);
`````

## Output


`````js filename=intro
let x /*:number*/ = 10;
$(1);
$(1);
if ($) {
  $(2);
  $(2);
  if ($) {
    $(3);
    if ($) {
      $(4);
      $(4);
      $(4);
      if ($) {
        $(5);
        $(5);
        if ($) {
          $(6);
          $(6);
          $(6);
          $(6);
          if ($) {
            $(8);
            $(8);
            $(8);
            $(10);
            $(9);
            $(9);
            $(9);
          } else {
          }
          $(10);
          $(10);
          $(11);
          x = 20;
          $(11);
        } else {
        }
        $(12);
        $(12);
        $(12);
      } else {
      }
    } else {
    }
    $(13);
  } else {
  }
  $(14);
  $(14);
  $(14);
  $(14);
  $(14);
} else {
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
$( 1 );
$( 1 );
if ($) {
  $( 2 );
  $( 2 );
  if ($) {
    $( 3 );
    if ($) {
      $( 4 );
      $( 4 );
      $( 4 );
      if ($) {
        $( 5 );
        $( 5 );
        if ($) {
          $( 6 );
          $( 6 );
          $( 6 );
          $( 6 );
          if ($) {
            $( 8 );
            $( 8 );
            $( 8 );
            $( 10 );
            $( 9 );
            $( 9 );
            $( 9 );
          }
          $( 10 );
          $( 10 );
          $( 11 );
          a = 20;
          $( 11 );
        }
        $( 12 );
        $( 12 );
        $( 12 );
      }
    }
    $( 13 );
  }
  $( 14 );
  $( 14 );
  $( 14 );
  $( 14 );
  $( 14 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: 4
 - 8: 4
 - 9: 5
 - 10: 5
 - 11: 6
 - 12: 6
 - 13: 6
 - 14: 6
 - 15: 8
 - 16: 8
 - 17: 8
 - 18: 10
 - 19: 9
 - 20: 9
 - 21: 9
 - 22: 10
 - 23: 10
 - 24: 11
 - 25: 11
 - 26: 12
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
