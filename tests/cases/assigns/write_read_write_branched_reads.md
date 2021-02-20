# Preval test case

# write_read_write_branched_reads.md

> Assigns > Write read write branched reads
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
// SSA since all future reads can only inspect this write
// In this case we cannot postpone the write since both branches will want to read it
x = $(2);
if ($(1)) $(x, 'b');
else $(x, 'c');
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x, 'b');
} else {
  $(x, 'c');
}
`````

## Output

`````js filename=intro
const x = $(1);
$(x, 'a');
const SSA_x = $(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(SSA_x, 'b');
} else {
  $(SSA_x, 'c');
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

Normalized calls: Same

Final output calls: Same
