# Preval test case

# class_computed_key_extends.md

> normalize > class > class_computed_key_extends
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

## Normalized

`````js filename=intro
const y = 'y';
let x = class {
  [y]() {}
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

Normalized calls: Same

Final output calls: Same
