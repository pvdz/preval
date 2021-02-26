# Preval test case

# no__second_write_inside_block.md

> Binding > Promote const > No  second write inside block
>
> Check what happens when the first write is in the same scope but in a deeper block, which would screw up if you'd create a constant for it.

This is an example of why flow analysis is required.

All future reads must be on the same block level or nested inside of it for otherwise an outer read (or write) will trigger an error.

The x should not be made a constant

#TODO

## Input

`````js filename=intro
var x;
if ($(1)) {
  x = 10;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
