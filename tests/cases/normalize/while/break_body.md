# Preval test case

# break_body.md

> Normalize > While > Break body
>
> While with just a break should be eliminated

#TODO

## Input

`````js filename=intro
while (true) {
  break;
}
$('pass');
`````

## Pre Normal

`````js filename=intro
while (true) {
  break;
}
$(`pass`);
`````

## Normalized

`````js filename=intro
$(`pass`);
`````

## Output

`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
