# Preval test case

# redundant_label_looped_deep.md

> Normalize > Break > Redundant label looped deep
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: while (x) {
  while(true) {
    $(1);
    
    if ($(1)) {
      x = $(3);
    }
    if (x) {
      break exit;
    } else {
      x = $(4);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(2);
exit: while (x) {
  while (true) {
    $(1);
    if ($(1)) {
      x = $(3);
    }
    if (x) {
      break exit;
    } else {
      x = $(4);
    }
  }
}
`````

## Normalized


`````js filename=intro
let x = $(2);
exit: {
  while (true) {
    if (x) {
      while (true) {
        $(1);
        const tmpIfTest = $(1);
        if (tmpIfTest) {
          x = $(3);
        } else {
        }
        if (x) {
          break exit;
        } else {
          x = $(4);
        }
      }
    } else {
      break;
    }
  }
}
`````

## Output


`````js filename=intro
exit: {
  let x /*:unknown*/ = $(2);
  while (true) {
    if (x) {
      while (true) {
        $(1);
        const tmpIfTest /*:unknown*/ = $(1);
        if (tmpIfTest) {
          x = $(3);
        } else {
        }
        if (x) {
          break exit;
        } else {
          x = $(4);
        }
      }
    } else {
      break;
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
exit: {
  let a = $( 2 );
  while (true) {
    if (a) {
      while (true) {
        $( 1 );
        const b = $( 1 );
        if (b) {
          a = $( 3 );
        }
        if (a) {
          break exit;
        }
        else {
          a = $( 4 );
        }
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
