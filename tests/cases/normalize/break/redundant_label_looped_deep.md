# Preval test case

# redundant_label_looped_deep.md

> Normalize > Break > Redundant label looped deep
>
> If a labeled break does the same thing without the label then the label should be dropped

#TODO

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
exit: while (x) {
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
}
`````

## Output

`````js filename=intro
let x = $(2);
exit: while (x) {
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
