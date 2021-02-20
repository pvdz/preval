# Preval test case

# write_read_branch_write.md

> Assigns > Write read branch write
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($(10)) $(x, 'branch')
x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, 'branch');
}
x = $(2);
$(x);
`````

## Output

`````js filename=intro
const x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, 'branch');
}
const SSA_x = $(2);
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 1, 'branch'
 - 4: 2
 - 5: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
