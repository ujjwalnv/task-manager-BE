function sendTaskAssignedMail(taskTitle: string, assignees: number[]){
    for(const assignee in assignees){
        // Add logic to send mail below
        console.log(`Email sent to User with Id: ${assignee} with title "${taskTitle}"`)
    }
}

export {
    sendTaskAssignedMail
}