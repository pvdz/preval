# Preval test case

# base_global_loop.md

> Ssa > Base global loop
>
> Contrived example

#TODO

## Input

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  const tmpCallCallee = $;
  x = x + 1;
  let tmpCalleeParam = x;
  tmpCallCallee(tmpCalleeParam);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  x = x + 1;
  const tmpCalleeParam = x;
  $(tmpCalleeParam);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
