# Preval test case

# write_read_write_branched_read.md

> Assigns > Write read write branched read
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
// SSA since all future reads can only inspect this write
// We could potentially even postpone the write if we can determine the value to be static
x = $(2);
if ($(1)) $(x, 'b');
`````

## Pre Normal

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
if ($(1)) $(x, 'b');
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x, 'b');
}
`````

## Output

`````js filename=intro
const x = $(1);
$(x, 'a');
const tmpSSA_x = $(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(tmpSSA_x, 'b');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 2
 - 4: 1
 - 5: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
