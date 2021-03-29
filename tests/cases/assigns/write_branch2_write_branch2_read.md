# Preval test case

# write_branch2_write_branch2_read.md

> Assigns > Write branch2 write branch2 read
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x); // Since this is the only read, the first write cannot be observed so we can eliminate it
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x);
  }
}
`````

## Normalized

`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 = $(20);
  if (tmpIfTest$1) {
    x = $(2);
    $(x);
  }
}
`````

## Output

`````js filename=intro
$(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 = $(20);
  if (tmpIfTest$1) {
    const tmpSSA_x = $(2);
    $(tmpSSA_x);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 20
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
