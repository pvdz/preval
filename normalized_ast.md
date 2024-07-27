A normalized ast would be a nested set of statements, a sort of subset of the regular JS ast.
It would be target JS as an output language even though the ast does not match that specifically.

Program >
    body: Block

Statement >
    AssignmentIdentStatement
    AssignmentPropStatement
    AssignmentComputedPropStatement
    BlockStatement
    BreakStatement
    CallStatement
    ConstStatement
    EmptyStatement
    ExportNamedDeclaration (?)
    ExpressionStatement
    IfStatement
    ImportDeclaration (?)
    LabelStatement
    LetStatement
    ReturnStatement
    ThrowStatement
    TryStatement
    WhileStatement

AssignmentIdentStatement >
    left: identifier
    right: Expression

AssignmentPropStatement >
    obj: SimpleExpression
    prop: string
    right: Expression

AssignmentComputedPropStatement >
    obj: SimpleExpression
    prop: SimpleExpression
    right: Expression

BlockStatement >
    body: Statement[]

BreakStatement >
    label?: string

EmptyStatemnt >
    -

ExportNamedDeclaration >
    ? TODO

IdentStatement >
    name: string

LabelStatement >
    label: string
    body: Block

ReturnStatement >
    expression: SimpleExpression

ThrowStatement >
    expression: SimpleExpression

TryStatement >
    body: BlockStatement
    id: Identifier
    trap: BlockStatement

ConstStatement >
    id: Identifier,
    init: Expression

LetStatement >
    id: Identifier
    init: Expression

WhileStatement >
    test: SimpleExpression
    body: BlockStatement

DebuggerStatement >
    -

ExpressionStatement >
    Expression
    AssignIdentExpression
    AssignPropExpression



Expression >
    SimpleExpression
    CallIdentExpression
    CallMethodExpression
    CallComputedMethodExpression
    AwaitExpression
    YieldExpression
    MemberExpression
    MemberComputedExpression
    UnaryExpression
    BinaryExpression
    ArrayLiteral
    ObjectLiteral
    ThisExpression
    Param

SimpleExpression >
    Identifier
    Primitive
    TemplateExpression

Primitive >
    type: number, true, false, undefined, null, NaN, Infinity, string

TemplateExpression >
    strings: string[]
    idents: Identifier[]

AssignIdentExpression >
    name: Identifier
    value: Expression

AssignPropExpression >
    obj: SimpleExpression
    prop: string
    value: SimpleExpression

AssignComputedPropExpression >
    obj: SimpleExpression
    prop: SimpleExpression
    value: SimpleExpression

Identifier >
    name: string but not Primitive.type

CallIdentExpression >
    callee: SimpleExpression
    args: Array<SimpleExpression>

CallMethodExpression >
    calleeObject: SimpleExpression
    calleeProp: string
    args: Array<SimpleExpression>

CallComputedMethodExpression >
    calleeObject: SimpleExpression
    calleeProp: SimpleExpression
    args: Array<SimpleExpression>

AwaitExpression >
    arg: SimpleExpression

YieldExpression >
    arg: SimpleExpression

FunctionExpression >
    name?: Identifier
    params: Param[]
    async: boolean
    generator: boolean
    body: BlockStatement (? or separate program and function blocks?)

Param >
    index: number
    name: string

MemberExpression >
    object: SimpleExpression
    prop: string

MemberComputedExpression >
    object: SimpleExpression
    prop: SimpleExpression

UnaryExpression >
    op: ~ ! + - typeof delete (void?)
    prop: SimpleExpression
        if op=delete then prop can be a MemberExpression

BinaryExpression >
    op: + - % ^ etc
    left: SimpleExpression
    right: SimpleExpression

ArrayLiteral >
    // (elements may have holes, those are null in the AST/PST)
    elements: (null, SimpleExpression, SpreadElement)[]

SpreadElement >
    arg: SimpleExpression

ObjectLiteral >
    props: (Prop, PropComputed, PropSpread)[]

ThisExpression >
    -

method >
    name: Ident
    isComputed: boolean
    isAsync: boolean
    isGenerator: boolean // is this even possible?
    func: FunctionExpression

PropComputed >
    name: SimpleExpression
    value: SimpleExpression

PropSpread >
    arg: SimpleExpression

ClassExpression >
    name?: Identifier
    extends?: SimpleExpression
    body: ClassBody

RegexLiteral >
    full
    pattern
    flags
