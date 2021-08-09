# Preval test case

# nested.md

> Tail breaking > Nested
>
> A problem case with a nested label and a statement after the `if` that disappears 

#TODO

## Input

`````js filename=intro
outer: {
  inner: {
    const b = $(3);
    if (b) {
      break outer;
    } else {
      break inner;
    }
  }
  $(`the_problem`);
}
`````

## Pre Normal

`````js filename=intro
outer: {
  inner: {
    const b = $(3);
    if (b) {
      break outer;
    } else {
      break inner;
    }
  }
  $(`the_problem`);
}
`````

## Normalized

`````js filename=intro
outer: {
  inner: {
    const b = $(3);
    if (b) {
      break outer;
    } else {
      break inner;
    }
  }
  $(`the_problem`);
}
`````

## Output

`````js filename=intro
const b = $(3);
if (b) {
} else {
  $(`the_problem`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same