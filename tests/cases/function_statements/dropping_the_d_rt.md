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
let THIS_IS_DA_______4__ = function () /*6*/ {
  $(`hello`);
};
$(THIS_IS_DA_______24__());
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
THIS_IS_DA____:
  - w @4           | ########## | 24          | none           | none
  - r @24          | 4

tmpCallCallee:
  - w @18          | ########## | 27          | none           | none
  - r @27          | 18

tmpCalleeParam:
  - w @22          | ########## | 28          | none           | none
  - r @28          | 22
