# Preval test case

# if_nested.md

> Labels > If nested
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

#TODO

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
          const tmpIfTest$2 = $(3);
          if (tmpIfTest$2) {
            break label2;
          } else {
            break label3;
          }
        }
      } else {
        return undefined;
      }
    }
  }
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $(0);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    label2: {
      const tmpIfTest$1 = $(2);
      if (tmpIfTest$1) {
        label3: {
          const tmpIfTest$2 = $(3);
          if (tmpIfTest$2) {
            break label2;
          } else {
            break label3;
          }
        }
      } else {
        return undefined;
      }
    }
  }
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
