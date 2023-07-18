# Preval test case

# stmt_complex_complex.md

> Logical > Or > Stmt complex complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) || $(2);
`````

## Pre Normal

`````js filename=intro
$(1) || $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
