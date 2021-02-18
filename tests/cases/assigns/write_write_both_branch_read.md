# Preval test case

# redundant_back2back.md

> assigns > redundant_back2back
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
else x = $(3);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
} else {
  x = $(3);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
} else {
  x = $(3);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 2
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
