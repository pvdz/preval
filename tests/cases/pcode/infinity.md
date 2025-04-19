# Preval test case

# infinity.md

> Pcode > Infinity
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Options

- pcode

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return -Infinity;
  } else {
    return -Infinity;
  }
}
function g() {
  if ($) return f();
}
if ($) $(g());
`````


## Pcode output


`````fileintro
f =
    [ return neg - ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `null`           => `null`            Ok
 - `f(undefined)`              => `null`           => `null`            Ok
 - `f(null)`                   => `null`           => `null`            Ok
 - `f(true)`                   => `null`           => `null`            Ok
 - `f(false)`                  => `null`           => `null`            Ok
 - `f("")`                     => `null`           => `null`            Ok
 - `f("preval")`               => `null`           => `null`            Ok
 - `f(0)`                      => `null`           => `null`            Ok
 - `f(1)`                      => `null`           => `null`            Ok
 - `f(0, 0)`                   => `null`           => `null`            Ok
 - `f(0, 1)`                   => `null`           => `null`            Ok
 - `f(1, 0)`                   => `null`           => `null`            Ok
 - `f(1, 1)`                   => `null`           => `null`            Ok
