# Preval test case

# dropping_the_d_rt.md

> Function statements > Dropping the d rt
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

--> function statements should be treated as decls and hoisted to the 
top of their func owner scope before further treatment. spec be damned

## Options

- refTest

## Input

`````js filename=intro
{
  {
    function THIS_IS_DA____() {
      $('hello');
    }
  }
  $(THIS_IS_DA____());
}
`````


## Output

(Annotated with pids)

`````filename=intro
let THIS_IS_DA____$1___5__ = function () /*7*/ {
  debugger;
  $(`hello`);
  return undefined___16__;
};
let tmpCalleeParam___18__ = THIS_IS_DA_______20__();
$(tmpCalleeParam___24__);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
THIS_IS_DA____$1:
  - w @5             | ########## | not read    | none           | none

tmpCalleeParam:
  - w @18            | ########## | 24          | none           | none
  - r @24            | 18
