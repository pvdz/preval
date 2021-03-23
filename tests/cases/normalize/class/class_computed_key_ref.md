# Preval test case

# class_computed_key_ref.md

> Normalize > Class > Class computed key ref
>
> Make sure the transform of computed key does not change something that can change the super class value

#TODO

## Input

`````js filename=intro
const y = 'y';
class x {
  [y](){}
}
`````

## Pre Normal

`````js filename=intro
const y = 'y';
let x = class {
  [y]() {
    debugger;
  }
};
`````

## Normalized

`````js filename=intro
const y = 'y';
let x = class {
  [y]() {
    debugger;
  }
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
