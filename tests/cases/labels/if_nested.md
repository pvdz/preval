# Preval test case

# if_nested.md

> Labels > If nested
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

## Input

`````js filename=intro
function f() {
  $(0);
  label1: 
    if ($(1)) {
      label2:
        if ($(2)) {
          label3:
            if ($(3)) {
              break label2;
            } else {
              break label3;
            }
        } else {
          break label1;
        }
    }
}
f();
`````

## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(3);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
if ($(1)) {
  if ($(2)) {
    $(3);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(0);
  label1: if ($(1)) {
    label2: if ($(2)) {
      label3: if ($(3)) {
        break label2;
      } else {
        break label3;
      }
    } else {
      break label1;
    }
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(0);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    label2: {
      const tmpIfTest$1 = $(2);
      if (tmpIfTest$1) {
        label3: {
          const tmpIfTest$3 = $(3);
          if (tmpIfTest$3) {
            break label2;
          } else {
            break label3;
          }
        }
      } else {
        return undefined;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    $( 3 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
