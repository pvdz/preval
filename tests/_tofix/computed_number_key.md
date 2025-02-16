# Preval test case

# computed_number_key.md

> Tofix > Computed number key

A number is a legit key so a number literal as computed key is equal to non-computed key (and probably as a string?)

## Input

`````js filename=intro
const x = {
  [200]: 'a'
};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = { [200]: `a` };
$(x);
`````

## Normalized


`````js filename=intro
const x = { [200]: `a` };
$(x);
`````

## Output


`````js filename=intro
const x /*:object*/ = { [200]: `a` };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 200 ]: "a" };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 200: '"a"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
