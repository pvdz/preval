# Preval test case

# write_write_read_branch.md

> Assigns > Write write read branch
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
if ($(10)) $(x, 'branch')
`````

## Pre Normal

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
if ($(10)) $(x, 'branch');
`````

## Normalized

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, 'branch');
} else {
}
`````

## Output

`````js filename=intro
$(1);
const x = $(2);
$(x);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, 'branch');
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 10
 - 5: 2, 'branch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
